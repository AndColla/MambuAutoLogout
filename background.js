chrome.idle.setDetectionInterval(60*5);

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
