import { PostMessageEvent } from './events';

export interface ITab {
  id: string;
  name: string;
  events: PostMessageEvent[];
}

export const createTab = async (tab: ITab): Promise<ITab[]> => {
  if (import.meta.env.DEV) {
    console.debug('Creating new tab - (Saving to localStorage)', tab);
    const rawTabs = localStorage.getItem('tabs') || '[]';
    const tabs = JSON.parse(rawTabs);

    /* If we haven't create anytabs yet */
    if (!tabs) {
      localStorage.setItem('tabs', JSON.stringify([tab]));
      return [tab];
    }

    /* If they exist */
    if (Array.isArray(tabs)) {
      localStorage.setItem('tabs', JSON.stringify([...tabs, tab]));
      return [...tabs, tab];
    }

    console.error('Failed to add tab, something went wrong!', {
      tab,
      tabs,
    });
  }

  return [];
};

export const updateTab = async (updateTab: ITab): Promise<ITab[]> => {
  if (import.meta.env.DEV) {
    console.debug('Updating tab - (Updating to localStorage)', updateTab);
    const rawTabs = localStorage.getItem('tabs') || '[]';
    const tabs = JSON.parse(rawTabs) as ITab[];

    /* If they exist */
    if (Array.isArray(tabs)) {
      const newTabs = tabs.map(tab => {
        if (tab.id === updateTab.id) {
          tab.name = updateTab.name;
        }

        return tab;
      });

      localStorage.setItem('tabs', JSON.stringify(newTabs));
      return newTabs;
    }
  }

  return [];
};

export const getTabs = async (): Promise<ITab[]> => {
  if (import.meta.env.DEV) {
    const rawTabs = localStorage.getItem('tabs') || '[]';
    const tabs = JSON.parse(rawTabs);

    console.log('Retrieved events:', tabs);

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
  }

  return [];
};
