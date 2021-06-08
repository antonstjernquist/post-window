import {
  CommandBar,
  ICommandBarItemProps,
  Stack,
  Text,
  TextField,
  PrimaryButton,
  CompoundButton,
  DefaultButton,
  DialogContent,
  Layer,
  DocumentCard,
} from '@fluentui/react';
import React, { FormEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { PostMessageEvent, updateEvent } from '../utils/events';
import Payload from './Payload';

const Container = styled.div`
  padding: 2rem;
  border: 1px solid #2222;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BarWrapper = styled.div`
  margin-right: -1rem;
`;

const Button = styled(DefaultButton)`
  margin-top: 1rem;
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

interface ButtonEventProps extends PostMessageEvent {
  setEvents(events: PostMessageEvent[]): void;
}
export const ButtonEvent = ({
  name,
  setEvents,
  ...event
}: ButtonEventProps) => {
  const [inputValue, setInputValue] = useState(name);
  const [isEditingName, setIsEditingName] = useState(false);

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
      updateEvent({ ...event, name: inputValue }).then(setEvents);
    }
  };

  const onRename = () => {
    setIsEditingName(prev => !prev);
  };

  const onDelete = () => {
    console.log('Deleting');
  };

  return (
    <Container>
      <Header>
        {isEditingName ? (
          <TextField
            autoFocus
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleOnEnter}
          />
        ) : (
          <Text variant="mediumPlus">{name}</Text>
        )}

        <BarWrapper>
          <CommandBar farItems={getItems({ onRename, onDelete })} items={[]} />
        </BarWrapper>
      </Header>

      <Payload />

      <Stack>
        <Stack.Item align="end">
          <Button>Send event</Button>
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default ButtonEvent;
