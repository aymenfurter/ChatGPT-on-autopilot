document.getElementById('saveBtn').addEventListener('click', saveOptions);

function saveOptions() {
  const apiUrl = document.getElementById('apiUrl').value;
  const apiKey = document.getElementById('apiKey').value;

  chrome.storage.sync.set({ apiUrl, apiKey }, () => {
    alert('Options saved.');
  });
}

function restoreOptions() {
  chrome.storage.sync.get(['apiUrl', 'apiKey'], (items) => {
    document.getElementById('apiUrl').value = items.apiUrl || '';
    document.getElementById('apiKey').value = items.apiKey || '';
  });
}

window.onload = () => {
  restoreOptions();
};
