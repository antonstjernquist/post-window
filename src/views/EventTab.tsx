import React, { useEffect, useState } from 'react';
import { deleteTab, ITab as IEventTab, ITab, updateTab } from '../utils/tabs';
import styled from 'styled-components';
import CreateToggle from '../components/CreateToggle';
import {
  ActionButton,
  CommandBar,
  DefaultButton,
  ICommandBarItemProps,
  Modal,
  PrimaryButton,
  ResizeGroup,
  Separator,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';
import { EventType, getEvents, PostMessageEvent } from '../utils/events';
import Event from '../components/Event';

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

interface GetItemsOptions {
  onDelete(): void;
  onRename(): void;
  onNewToggle(): void;
  onNewButton(): void;
  onNewSlider(): void;
}
const getItems = ({
  onDelete,
  onRename,
  onNewToggle,
  onNewButton,
  onNewSlider,
}: GetItemsOptions): ICommandBarItemProps[] => [
  {
    key: 'newItem',
    text: 'New',
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      items: [
        {
          key: 'eventToggle',
          text: 'Toggle',
          iconProps: { iconName: 'Switch' },
          onClick: onNewToggle,
        },
        {
          key: 'event',
          text: 'Button',
          iconProps: { iconName: 'ButtonControl' },
          onClick: onNewButton,
        },
        {
          key: 'event',
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

export interface EventTabProps extends IEventTab {
  setTabs(tabs: ITab[]): void;
}

export const EventTab = (props: EventTabProps) => {
  const [events, setEvents] = useState<PostMessageEvent[]>([]);
  const [newNameValue, setNewNameValue] = useState(props.name);
  const [isEdit, setIsEdit] = useState(false);
  const [newEvent, setNewEvent] = useState<EventType>();

  useEffect(() => {
    getEvents(props.id).then(setEvents);
  }, []);

  const onDismiss = () => {
    setNewEvent(undefined);
  };

  const handleTabEditName = () => {
    setIsEdit(false);
    updateTab({ id: props.id, name: newNameValue, events }).then(props.setTabs);
  };

  const handleDeleteTab = () => {
    console.log('Removing tab:', props.id);
    deleteTab(props.id).then(props.setTabs);
  };

  return (
    <>
      <Container>
        <Header>
          {isEdit ? (
            <Stack horizontal>
              <TextField
                autoFocus
                value={newNameValue}
                onKeyPress={({ key }) => key === 'Enter' && handleTabEditName()}
                onChange={event => setNewNameValue(event.currentTarget.value)}
              />
              <PrimaryButton
                onClick={handleTabEditName}
                style={{ marginLeft: '0.5rem' }}
              >
                Save
              </PrimaryButton>
              <DefaultButton
                onClick={() => setIsEdit(false)}
                style={{ marginLeft: '0.5rem' }}
              >
                Close
              </DefaultButton>
            </Stack>
          ) : (
            <Text style={{ flex: 1 }} variant="xLarge">
              {props.name}
            </Text>
          )}

          <CommandBar
            items={getItems({
              onDelete: handleDeleteTab,
              onRename: () => setIsEdit(true),
              onNewToggle: () => setNewEvent(EventType.TOGGLE),
              onNewButton: () => setNewEvent(EventType.BUTTON),
              onNewSlider: () => setNewEvent(EventType.SLIDER),
            })}
          />
        </Header>

        <Separator />

        {events.length === 0 ? (
          <Text variant="medium">There are no events yet</Text>
        ) : (
          <Stack tokens={{ childrenGap: 10 }}>
            {events.map(event => (
              <Event {...event} />
            ))}
          </Stack>
        )}

        <Modal
          isDarkOverlay
          isOpen={newEvent === EventType.TOGGLE}
          onDismiss={onDismiss}
        >
          <CreateToggle
            tab={props}
            onDismiss={onDismiss}
            setEvents={setEvents}
          />
        </Modal>

        <Modal
          isDarkOverlay
          isOpen={newEvent === EventType.BUTTON}
          onDismiss={onDismiss}
        >
          <CreateToggle
            tab={props}
            onDismiss={onDismiss}
            setEvents={setEvents}
          />
        </Modal>
      </Container>
    </>
  );
};

export default EventTab;
