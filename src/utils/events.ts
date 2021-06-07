export type PostMessageEventType = 'button' | 'toggle' | 'slider';

export interface PostMessageEvent {
  event: string;
  label: string;
  payload: string;
  type: PostMessageEventType;
  buttonColor?: ColorSpaceConversion;
}

export const createEvent = (event: PostMessageEvent) => {
  if (import.meta.env.DEV) {
    console.debug('Creating event! - Saving to localStorage', event);
    const rawEvents = localStorage.getItem('events') || '[]';
    const events = JSON.parse(rawEvents);

    /* If we haven't set the events yet */
    if (!events) {
      localStorage.setItem('events', JSON.stringify([event]));
      return;
    }

    /* If they exist */
    if (Array.isArray(events)) {
      localStorage.setItem('events', JSON.stringify([...events, event]));
      return;
    }

    console.error('Failed to add event, something went wrong!', {
      event,
      events,
    });
  }

  chrome.storage.sync.get('events', ({ events }) => {
    console.log('Retrieved events:', events);

    const inputEvents = events ?? [];

    chrome.storage.sync.set({ events: [...inputEvents, event] });
  });

  chrome.storage.sync.set({ events: [event] });
};

export const getEvents = async (): Promise<PostMessageEvent[]> => {
  if (import.meta.env.DEV) {
    const rawEvents = localStorage.getItem('events') || '[]';
    const events = JSON.parse(rawEvents);

    console.log('Retrieved events:', events);

    /* If we haven't set the events yet */
    if (!events) {
      return [];
    }

    /* If they exist */
    if (Array.isArray(events)) {
      return events;
    }

    console.error('Failed to retrieve events, something went wrong!', {
      events,
    });

    return [];
  }

  return await new Promise(resolve => {
    chrome.storage.sync.get('events', ({ events }) => {
      console.log('Retrieved events:', events);
      resolve(events as PostMessageEvent[]);
    });
  });
};
