export enum EventType {
  TOGGLE = 'TOGGLE',
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
}
export interface PostMessageEvent {
  tabId: string;
  name: string;
  event: string;
  payload: string;
  type: EventType;
}

export const getEvents = async (tabId: string): Promise<PostMessageEvent[]> => {
  if (import.meta.env.DEV) {
    const rawEvents = localStorage.getItem('events') || '[]';
    const unfilteredEvents = JSON.parse(rawEvents) as PostMessageEvent[];
    const events = unfilteredEvents.filter(event => event.tabId === tabId);

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
    chrome.storage.sync.get('events', ({ events = [] }) => {
      console.log('Retrieved events:', events);
      resolve(events as PostMessageEvent[]);
    });
  });
};

export const createEvent = async (event: PostMessageEvent) => {
  const events = await getEvents(event.tabId);

  if (import.meta.env.DEV) {
    console.debug('Creating event! - Saving to localStorage', event);

    /* If we haven't set the events yet */
    if (!events) {
      localStorage.setItem('events', JSON.stringify([event]));
      return [event];
    }

    /* If they exist */
    if (Array.isArray(events)) {
      localStorage.setItem('events', JSON.stringify([...events, event]));
      return [...events, event];
    }

    console.error('Failed to add event, something went wrong!', {
      event,
      events,
    });
  }

  chrome.storage.sync.set({ events: [...events, event] });
  return [...events, event];
};

export const clearStorage = () => {
  if (import.meta.env.DEV) {
    return;
  }

  chrome.storage.local.clear();
  chrome.storage.sync.clear();
};
