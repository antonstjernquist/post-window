import { uuidv4 } from './uuid';

export enum EventType {
  TOGGLE = 'TOGGLE',
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
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

export const getEvents = async (tabId: string): Promise<PostMessageEvent[]> => {
  if (import.meta.env.DEV) {
    const rawEvents = localStorage.getItem('events') || '[]';
    const unfilteredEvents = JSON.parse(rawEvents) as PostMessageEvent[];
    const events =
      unfilteredEvents.filter(event => event.tabId === tabId) ?? [];
    return events;
  }

  return await new Promise(resolve => {
    chrome.storage.sync.get('events', ({ events = [] }) => {
      const evs: PostMessageEvent[] = events;
      const filteredEvents = evs.filter(event => event.tabId === tabId);
      resolve(filteredEvents);
    });
  });
};

export const updateEvent = async (event: PostMessageEvent) => {
  const events = await getEvents(event.tabId);
  const updatedEvents = events.map(oldEvent =>
    oldEvent.id === event.id ? event : oldEvent
  );
  return setEvents(updatedEvents);
};

export const createEvent = async (event: Omit<PostMessageEvent, 'id'>) => {
  const events = await getEvents(event.tabId);

  return setEvents([...events, { ...event, id: uuidv4() }]);
};

export const clearStorage = () => {
  if (import.meta.env.DEV) {
    return;
  }

  chrome.storage.local.clear();
  chrome.storage.sync.clear();
};
