import Icon from '@ant-design/icons/lib/components/Icon';
import { Button, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { createTab, ITab, getTabs, updateTab } from '../utils/tabs';
import {
  EditFilled,
  EditOutlined,
  PlusOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons';
import EventTab from './EventTab';
import { uuidv4 } from '../utils/uuid';

const { Text } = Typography;

const NEW_TAB_ID = 'NEW_TAB';
const exampleTab: ITab = {
  name: 'Example tab',
  id: 'initial-tab',
};

export const EventTabs = () => {
  const [isEdit, setIsEdit] = useState(false);
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
      createTab({ name: 'New tab', id }).then(tabs => {
        setTabs(tabs);
        setActiveTab(id);
      });

      return;
    }

    setActiveTab(tab);
  };

  const handleTabEditName = (tab: string, name: string) => {
    updateTab({ id: tab, name }).then(setTabs);
  };

  return (
    <div>
      <Tabs
        tabBarExtraContent={{
          right: (
            <Button onClick={() => setIsEdit(prev => !prev)}>Edit names</Button>
          ),
        }}
        size="large"
        type="card"
        activeKey={activeTab}
        onChange={handleNewTab}
      >
        {tabs.map(tab => {
          return (
            <Tabs.TabPane
              tab={
                <Text
                  style={{ margin: 0, left: 0, padding: 0 }}
                  editable={{
                    icon: isEdit ? <EditOutlined /> : ' ',
                    maxLength: 32,
                    autoSize: true,
                    tooltip: true,
                    onChange: name => handleTabEditName(tab.id, name),
                  }}
                  type="secondary"
                >
                  {tab.name}
                </Text>
              }
              key={tab.id}
            >
              <EventTab {...tab} />
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
