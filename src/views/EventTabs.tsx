import React, { useEffect, useState } from 'react';
import { createTab, ITab, getTabs } from '../utils/tabs';
import { uuidv4 } from '../utils/uuid';
import {
  ILabelStyles,
  IStyleSet,
  Label,
  Pivot,
  PivotItem,
} from '@fluentui/react';
import styled from 'styled-components';
import EventTab from './EventTab';

const Container = styled.div`
  min-width: 40vw;
  min-height: 25rem;
  padding: 1rem;
`;

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const NEW_TAB_ID = 'NEW_TAB';
const exampleTab: ITab = {
  name: 'Example tab',
  id: 'initial-tab',
  events: [],
};

export const EventTabs = () => {
  const [tabs, setTabs] = useState<ITab[]>([]);

  useEffect(() => {
    getTabs().then(tabs => {
      if (tabs.length === 0) {
        /* Create initial example tab */
        createTab(exampleTab);
        setTabs([exampleTab]);
        return;
      }
      setTabs(tabs);
    });
  }, [getTabs, setTabs]);

  const handleNewTab = (item?: PivotItem) => {
    const id = uuidv4();
    if (item?.props.id === NEW_TAB_ID) {
      createTab({ name: 'New tab', id, events: [] }).then(tabs => {
        setTabs(tabs);
      });
    }
  };

  return (
    <Container>
      <Pivot
        aria-label='Basic Pivot Example'
        onLinkClick={handleNewTab}
        overflowBehavior='menu'
      >
        {tabs.map(tab => {
          return (
            <PivotItem headerText={tab.name} key={tab.id} alwaysRender>
              <EventTab {...tab} setTabs={setTabs} />
            </PivotItem>
          );
        })}

        <PivotItem id={NEW_TAB_ID} itemIcon={'Add'} key={NEW_TAB_ID}>
          <Label styles={labelStyles}>Pivot #2</Label>
        </PivotItem>
      </Pivot>
    </Container>
  );
};

export default EventTabs;
