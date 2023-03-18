// Check if the extension is properly configured
chrome.storage.sync.get(['apiUrl', 'apiKey'], (items) => {


  // Extension is configured, continue with the code
  window.API_URL = items.apiUrl;
  window.API_KEY = items.apiKey;
});
