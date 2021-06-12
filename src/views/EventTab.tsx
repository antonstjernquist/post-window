import React, { useEffect, useState } from 'react';
import { deleteTab, ITab as IEventTab, ITab, updateTab } from '../utils/tabs';
import styled from 'styled-components';
import {
  CommandBar,
  DefaultButton,
  ICommandBarItemProps,
  PrimaryButton,
  Separator,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';
import {
  createEvent,
  EventType,
  getEvents,
  PostMessageEvent,
} from '../utils/events';

import Event from '../components/Events';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  overflow: hidden;
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
`;

interface GetEditItemsOptions {
  onEdit(): void;
  onDelete(): void;
  onRename(): void;
  onNewToggle(): void;
  onNewButton(): void;
  onNewSlider(): void;
  onNewSimple(): void;
}
const getEditItems = ({
  onEdit,
  onDelete,
  onRename,
  onNewToggle,
  onNewButton,
  onNewSlider,
  onNewSimple,
}: GetEditItemsOptions): ICommandBarItemProps[] => [
  {
    key: 'prod',
    text: 'Stop editing',
    iconProps: { iconName: 'Blocked' },
    onClick: onEdit,
  },
  {
    key: 'newItem',
    text: 'New',
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      items: [
        {
          key: 'toggle',
          text: 'Toggle',
          iconProps: { iconName: 'Switch' },
          onClick: onNewToggle,
        },
        {
          key: 'button',
          text: 'Button',
          iconProps: { iconName: 'ButtonControl' },
          onClick: onNewButton,
        },
        {
          key: 'simpleButton',
          text: 'Button (Single value)',
          iconProps: { iconName: 'ButtonControl' },
          onClick: onNewSimple,
        },
        {
          key: 'slider',
          text: 'Slider',
          iconProps: { iconName: 'Slider' },
          onClick: onNewSlider,
        },
      ],
    },
  },
  {
    key: 'rename',
    text: 'Rename',
    iconProps: { iconName: 'Edit' },
    onClick: onRename,
  },
  {
    key: 'delete',
    text: 'Delete',
    iconProps: { iconName: 'Delete', style: { color: 'salmon' } },
    onClick: onDelete,
  },
];

interface GetItemsOptions {
  onEdit(): void;
  onDelete(): void;
  onRename(): void;
}
export const getItems = ({
  onEdit,
  onRename,
  onDelete,
}: GetItemsOptions): ICommandBarItemProps[] => [
  {
    key: 'prod',
    text: 'Edit',
    iconProps: { iconName: 'DoubleColumnEdit' },
    onClick: onEdit,
  },
  {
    key: 'rename',
    text: 'Rename',
    iconProps: { iconName: 'Edit' },
    onClick: onRename,
  },
  {
    key: 'delete',
    text: 'Delete',
    iconProps: { iconName: 'Delete', style: { color: 'salmon' } },
    onClick: onDelete,
  },
];

export interface EventTabProps extends IEventTab {
  setTabs(tabs: ITab[]): void;
}

export const EventTab = (props: EventTabProps) => {
  const [isEditView, setIsEditView] = useState(false);
  const [events, setEvents] = useState<PostMessageEvent[]>([]);
  const [newNameValue, setNewNameValue] = useState(props.name);
  const [isEditTabname, setIsEditTabname] = useState(false);

  useEffect(() => {
    getEvents(props.id).then(setEvents);
  }, []);

  const handleTabEditName = () => {
    setIsEditTabname(false);
    updateTab({ id: props.id, name: newNameValue, events }).then(props.setTabs);
  };

  const handleDeleteTab = () => {
    deleteTab(props.id).then(props.setTabs);
  };

  const newEventFactory = (eventType: EventType) => () => {
    createEvent({
      name: `New event ${eventType.toString()}`,
      type: eventType,
      event: '',
      payload: '',
      tabId: props.id,
    }).then(setEvents);
  };

  console.log('events:', events);

  return (
    <>
      <Container>
        <Header>
          <div style={{ minWidth: '15rem' }}>
            {isEditTabname ? (
              <Stack horizontal>
                <TextField
                  autoFocus
                  value={newNameValue}
                  onKeyPress={({ key }) =>
                    key === 'Enter' && handleTabEditName()
                  }
                  onChange={event => setNewNameValue(event.currentTarget.value)}
                />
                <PrimaryButton
                  onClick={handleTabEditName}
                  style={{ marginLeft: '0.5rem' }}
                >
                  Save
                </PrimaryButton>
                <DefaultButton
                  onClick={() => setIsEditTabname(false)}
                  style={{ marginLeft: '0.5rem' }}
                >
                  Close
                </DefaultButton>
              </Stack>
            ) : (
              <Text variant='xLarge'>{props.name}</Text>
            )}
          </div>

          <div style={{ minWidth: isEditView ? '20rem' : '16rem' }}>
            <CommandBar
              items={
                isEditView
                  ? getEditItems({
                      onDelete: handleDeleteTab,
                      onEdit: () => setIsEditView(false),
                      onRename: () => setIsEditTabname(true),
                      onNewButton: newEventFactory(EventType.BUTTON),
                      onNewToggle: newEventFactory(EventType.TOGGLE),
                      onNewSlider: newEventFactory(EventType.SLIDER),
                      onNewSimple: newEventFactory(EventType.SIMPLE),
                    })
                  : getItems({
                      onDelete: handleDeleteTab,
                      onEdit: () => setIsEditView(false),
                      onRename: () => setIsEditTabname(true),
                    })
              }
            />
          </div>
        </Header>

        <Separator />

        {events.length === 0 && (
          <Text variant='medium'>There are no events yet</Text>
        )}

        {events.length > 1 && (
          <Stack tokens={{ childrenGap: 10 }}>
            {events.map(event => (
              <Event
                key={event.id}
                event={event}
                setEvents={setEvents}
                isEdit={isEditView}
              />
            ))}
          </Stack>
        )}
      </Container>
    </>
  );
};

export default EventTab;
