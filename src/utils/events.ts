import { uuidv4 } from './uuid';

export enum EventType {
  TOGGLE = 'TOGGLE',
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
  SIMPLE = 'SIMPLE',
}
export interface PostMessageEvent {
  id: string;
  tabId: string;
  name: string;
  event: string;
  payload: string;
  type: EventType;
}

export const setEvents = async (events: PostMessageEvent[]) => {
  if (import.meta.env.DEV) {
    localStorage.setItem('events', JSON.stringify(events));
  } else {
    chrome.storage.sync.set({ events });
  }
  return events;
};

export const getEvents = async (
  tabId?: string
): Promise<PostMessageEvent[]> => {
  if (import.meta.env.DEV) {
    const rawEvents = localStorage.getItem('events') || '[]';
    const unfilteredEvents = JSON.parse(rawEvents) as PostMessageEvent[];

    if (!tabId) {
      return unfilteredEvents;
    }

    const events =
      unfilteredEvents.filter(event => event.tabId === tabId) ?? [];
    return events;
  }

  return await new Promise(resolve => {
    chrome.storage.sync.get('events', ({ events = [] }) => {
      const unfilteredEvents: PostMessageEvent[] = events;
      if (!tabId) {
        return resolve(unfilteredEvents);
      }

      const filteredEvents = unfilteredEvents.filter(
        event => event.tabId === tabId
      );
      resolve(filteredEvents);
    });
  });
};

export const updateEvent = async (event: PostMessageEvent) => {
  const events = await getEvents();
  console.log({ events });
  const updatedEvents = events.map(oldEvent =>
    oldEvent.id === event.id ? event : oldEvent
  );

  console.log({ updatedEvents });
  setEvents(updatedEvents);
  return await getEvents(event.tabId);
};

export const createEvent = async (event: Omit<PostMessageEvent, 'id'>) => {
  const events = await getEvents();
  setEvents([...events, { ...event, id: uuidv4() }]);
  return await getEvents(event.tabId);
};

export const deleteEvent = async (tabId: string, eventId: string) => {
  const events = await getEvents();
  setEvents(events.filter(event => event.id !== eventId));
  return await getEvents(tabId);
};

export const clearStorage = () => {
  if (import.meta.env.DEV) {
    return;
  }

  chrome.storage.local.clear();
  chrome.storage.sync.clear();
};
