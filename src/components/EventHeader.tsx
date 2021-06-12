import React, { FormEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { deleteEvent, PostMessageEvent, updateEvent } from '../utils/events';
import {
  CommandBar,
  ICommandBarItemProps,
  Separator,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';
import { KeyboardEvent } from 'react';
import Tutorial from './Tutorial';
import { post } from '../utils/post';

const Header = styled.div`
  display: flex;
  align-items: center;
`;

interface GetItemsOptions {
  onDelete(): void;
  onRename(): void;
}
const getItems = ({
  onRename,
  onDelete,
}: GetItemsOptions): ICommandBarItemProps[] => [
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

interface GetOverflowItemsOptions {
  onHelp(): void;
}
const getOverflowItems = ({
  onHelp,
}: GetOverflowItemsOptions): ICommandBarItemProps[] => [
  {
    key: 'openHelp',
    text: 'Help',
    iconProps: { iconName: 'Help' },
    onClick: onHelp,
  },
];

export interface EventHeaderProps {
  event: PostMessageEvent;
  setEvents(events: PostMessageEvent[]): void;
  onTutorialSteps?: CallableFunction[];
  onTutorialComplete?: CallableFunction;
}
export const EventHeader = (props: EventHeaderProps) => {
  const { name, tabId, id, event } = props.event;
  const [inputValue, setInputValue] = useState(name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const [eventPayloadType, setEventPayloadType] = useState(event);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.currentTarget.value);
  };

  const handleOnEnter = (
    keyEvent: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (keyEvent.key === 'Enter') {
      setIsEditingName(false);
      updateEvent({ ...props.event, name: inputValue }).then(props.setEvents);
    }
  };

  const onRename = () => {
    setIsEditingName(prev => !prev);
  };

  const onDelete = () => {
    deleteEvent(tabId, id).then(props.setEvents);
  };

  const handleEventChange = (
    ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newEvent = ev.currentTarget.value;
    setEventPayloadType(newEvent);
    updateEvent({ ...props.event, event: newEvent }).then(props.setEvents);
  };

  return (
    <Stack>
      <Stack.Item>
        <Header>
          {isEditingName ? (
            <TextField
              autoFocus
              value={inputValue}
              onChange={handleChange}
              onKeyPress={handleOnEnter}
            />
          ) : (
            <Text
              variant='mediumPlus'
              style={{ maxWidth: '20rem', display: 'inline-block' }}
            >
              {name}
            </Text>
          )}

          <CommandBar
            style={{
              marginLeft: 'auto',
              minWidth: '16rem',
            }}
            items={getItems({ onRename, onDelete })}
            overflowItems={getOverflowItems({
              onHelp: () => setIsHelpVisible(true),
            })}
          />
        </Header>
      </Stack.Item>

      <Separator />

      <Stack.Item>
        <TextField
          id={`tutorial-${props.event.id}-1`}
          value={eventPayloadType}
          onChange={handleEventChange}
          prefix='Event'
          placeholder='SET_VISIBILITY'
        />
      </Stack.Item>

      <Tutorial
        onSteps={props.onTutorialSteps ?? []}
        event={props.event}
        isVisible={isHelpVisible}
        onComplete={props.onTutorialComplete}
        onDismiss={() => setIsHelpVisible(false)}
      />
    </Stack>
  );
};
