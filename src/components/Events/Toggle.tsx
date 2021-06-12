import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { post } from '../../utils/post';
import { EventHeader } from '../EventHeader';
import { Stack, Text, Toggle } from '@fluentui/react';
import { PostMessageEvent } from '../../utils/events';

const Container = styled.div``;

export interface ToggleEventProps {
  isEdit: boolean;
  event: PostMessageEvent;
  setEvents(events: PostMessageEvent[]): void;
}
export const ToggleEvent = ({ isEdit, event, setEvents }: ToggleEventProps) => {
  const [isActive, setIsAtive] = useState(false);

  const handleToggle = () => {
    setIsAtive(prev => !prev);
    post({ type: event.event, payload: isActive });
  };

  if (!isEdit) {
    return (
      <Stack horizontal styles={{ root: { justifyContent: 'space-between' } }}>
        <Stack.Item align='center'>
          <Text variant='medium'>{event.name}</Text>
        </Stack.Item>
        <Stack.Item align='center'>
          <Toggle
            styles={{ root: { marginBottom: 0 } }}
            disabled={!event.event}
            checked={isActive}
            onChange={handleToggle}
          />
        </Stack.Item>
      </Stack>
    );
  }

  return (
    <Container>
      <EventHeader event={event} setEvents={setEvents} />

      <Stack>
        <Stack.Item align='end' style={{ marginTop: '1rem' }}>
          <Toggle
            checked={isActive}
            disabled={!event.event}
            onChange={handleToggle}
          />
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default ToggleEvent;
