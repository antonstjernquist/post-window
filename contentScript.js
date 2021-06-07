console.debug('Injected!');
/* This script is injected into the window so we can send window events from the panel. */
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  console.debug('Recieved message:', message);

  if (message.type === 'POST_MESSAGE_BUILDER_EVENT') {
    window.postMessage(message.payload);
  }
});
