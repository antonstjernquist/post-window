import { PostMessageEvent } from './events';

export interface ITab {
  id: string;
  name: string;
  events: PostMessageEvent[];
}

export const setTabs = async (tabs: ITab[]): Promise<ITab[]> => {
  if (import.meta.env.DEV) {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  } else {
    chrome.storage.sync.set({ tabs });
  }

  return tabs;
};

export const getTabs = async (): Promise<ITab[]> => {
  if (import.meta.env.DEV) {
    const rawTabs = localStorage.getItem('tabs') || '[]';
    const tabs = JSON.parse(rawTabs);

    /* If we haven't created any tabs yet */
    if (!tabs) {
      return [];
    }

    /* If they exist */
    if (Array.isArray(tabs)) {
      return tabs;
    }

    console.error('Failed to retrieve tabs, something went wrong!', {
      tabs,
    });

    return [];
  }

  return await new Promise(resolve => {
    chrome.storage.sync.get('tabs', ({ tabs = [] }) => {
      resolve(tabs as ITab[]);
    });
  });
};

export const createTab = async (tab: ITab): Promise<ITab[]> => {
  const tabs = await getTabs();
  return setTabs([...tabs, tab]);
};

export const updateTab = async (updateTab: ITab): Promise<ITab[]> => {
  const tabs = await getTabs();

  const updatedTabs = tabs.map(tab => {
    if (tab.id === updateTab.id) {
      tab.name = updateTab.name;
    }
    return tab;
  });

  return setTabs(updatedTabs);
};

export const deleteTab = async (id: string): Promise<ITab[]> => {
  const tabs = await getTabs();
  return setTabs(tabs.filter(tab => tab.id !== id));
};
