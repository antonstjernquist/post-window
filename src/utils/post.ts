import { POST_MESSAGE_BUILDER_EVENT } from '../constants';

export interface Event {
  type: string;
  payload: unknown;
}
export interface Payload {
  type: string;
  payload: number | string | boolean;
}
export const post = (payload: Payload) => {
  /* Development MODE - Send event instant! */
  if (import.meta.env.DEV) {
    console.debug('Sent:', payload);
    window.postMessage(payload, '*');
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const ID = 0;
    const tabID = tabs[ID].id;

    const message = {
      type: POST_MESSAGE_BUILDER_EVENT,
      payload,
    };

    console.debug('TabID:', tabID);
    if (tabID) {
      console.debug('Sending:', message);
      chrome.tabs.sendMessage(tabID, message);
    }
  });
};
