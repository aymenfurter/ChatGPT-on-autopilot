chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getAPIConfig') {
    chrome.storage.sync.get(['apiUrl', 'apiKey'], (items) => {
      sendResponse({ apiUrl: items.apiUrl || '', apiKey: items.apiKey || '' });
    });
    return true;
  }
});
