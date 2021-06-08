import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { createTab, ITab, getTabs, updateTab } from '../utils/tabs';
import { PlusOutlined } from '@ant-design/icons';
import EventTab from './EventTab';
import { uuidv4 } from '../utils/uuid';

const NEW_TAB_ID = 'NEW_TAB';
const exampleTab: ITab = {
  name: 'Example tab',
  id: 'initial-tab',
  events: [],
};

export const EventTabs = () => {
  const [activeTab, setActiveTab] = useState(exampleTab.id);
  const [tabs, setTabs] = useState<ITab[]>([]);

  useEffect(() => {
    getTabs().then(tabs => {
      if (tabs.length === 0) {
        /* Create initial example tab */
        createTab(exampleTab);
        setTabs([exampleTab]);
        return;
      }
      console.log({ tabs });
      setTabs(tabs);
    });
  }, [getTabs, setTabs]);

  const handleNewTab = (tab: string) => {
    const id = uuidv4();
    if (tab === NEW_TAB_ID) {
      createTab({ name: 'New tab', id, events: [] }).then(tabs => {
        setTabs(tabs);
        setActiveTab(id);
      });

      return;
    }

    setActiveTab(tab);
  };

  return (
    <div>
      <Tabs
        size='large'
        type='card'
        activeKey={activeTab}
        onChange={handleNewTab}
      >
        {tabs.map(tab => {
          return (
            <Tabs.TabPane tab={tab.name} key={tab.id}>
              <EventTab {...tab} setTabs={setTabs} />
            </Tabs.TabPane>
          );
        })}

        {/* Create new tab */}
        <Tabs.TabPane
          tab={<PlusOutlined style={{ margin: '0' }} />}
          key={NEW_TAB_ID}
        />
      </Tabs>
    </div>
  );
};

export default EventTabs;
