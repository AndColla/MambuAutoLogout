// Saves options to chrome.storage
const saveOptions = () => {
  const subdomain = document.getElementById('subdomain').value;
  const interval = document.getElementById('interval').value;

  chrome.storage.local.set(
    { interval: interval, subdomain: subdomain },
    () => {
      // Update status to let user know options were saved.
      const button = document.getElementById('save');
      button.textContent = 'Opzioni salvate!';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = 'Salva';
        button.disabled = false;
      }, 1500);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.local.get(
    { interval: 5, subdomain: 'demo' },
    (storage) => {
      document.getElementById('interval').value = storage.interval;
      document.getElementById('subdomain').value = storage.subdomain;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
