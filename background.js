chrome.storage.local.get({ interval: 5 }).then((storage) => {
  chrome.idle.setDetectionInterval(storage.interval * 60);
});

chrome.storage.onChanged.addListener(async function(changes, namespace) {
  if (namespace === 'local' && 'interval' in changes) {
    chrome.idle.setDetectionInterval(changes.interval.newValue * 60);
  }
})

chrome.idle.onStateChanged.addListener(async function(newState) {
  switch (newState) {
    case chrome.idle.IdleState.IDLE:
      await logout();
      break;
  }
});

async function logout() {
  const storage = await chrome.storage.local.get({ subdomain: 'demo' });

  let sessionKey = await chrome.cookies.get({
    url: `https://${storage.subdomain}.mambu.cloud`,
    name: 'sessionKey'
  });

  if (sessionKey !== null && sessionKey.value !== '') {
    chrome.cookies.remove({
      url: `https://${storage.subdomain}.mambu.cloud`,
      name: 'sessionKey'
    });
  }
}
