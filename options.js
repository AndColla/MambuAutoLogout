// Saves options to chrome.storage
const saveOptions = () => {
  const subdomain = document.getElementById('subdomain').value;

  chrome.storage.local.set(
    { subdomain: subdomain },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Opzioni salvate!';
      setTimeout(() => {
        status.textContent = '';
      }, 1500);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.local.get(
    { subdomain: 'demo' },
    (storage) => {
      document.getElementById('subdomain').value = storage.subdomain;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
