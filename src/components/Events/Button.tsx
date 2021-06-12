import { PrimaryButton, Stack, Text, TextField } from '@fluentui/react';
import React, { FormEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { enterValueSlowly } from '../../utils/animation';
import { PostMessageEvent, updateEvent } from '../../utils/events';
import { post } from '../../utils/post';
import { EventHeader } from '../EventHeader';

const Container = styled.div``;

interface SimpleButtonEventProps {
  isEdit: boolean;
  event: PostMessageEvent;
  setEvents(events: PostMessageEvent[]): void;
}
export const SimpleButtonEvent = ({
  event,
  isEdit,
  setEvents,
}: SimpleButtonEventProps) => {
  const [payload, setPayload] = useState('');

  const handleSend = () => {
    post({ type: event.event, payload });
  };

  const handleChangePayload = (
    ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPayload(ev.currentTarget.value);
    updateEvent({ ...event, payload });
  };

  const handleFirst = () => {
    enterValueSlowly(setPayload, 'true');
  };

  if (!isEdit) {
    return (
      <Stack horizontal styles={{ root: { justifyContent: 'space-between' } }}>
        <Stack.Item align='center'>
          <Text variant='medium'>{event.name}</Text>
        </Stack.Item>
        <Stack.Item align='center'>
          <PrimaryButton onClick={handleSend} disabled={!event.event}>
            Send event
          </PrimaryButton>
        </Stack.Item>
      </Stack>
    );
  }

  return (
    <Container>
      <EventHeader
        event={event}
        setEvents={setEvents}
        onTutorialComplete={handleSend}
        onTutorialSteps={[() => console.log('first'), handleFirst, handleFirst]}
      />

      <Stack
        styles={{ root: { marginTop: '0.5rem' } }}
        horizontal
        tokens={{ childrenGap: 8 }}
      >
        <Stack.Item>
          <TextField
            id={`tutorial-${event.id}-2`}
            placeholder='Payload ..'
            value={payload}
            onChange={handleChangePayload}
          ></TextField>
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton
            onClick={handleSend}
            disabled={!event.event}
            id={`tutorial-${event.id}-3`}
          >
            Send event
          </PrimaryButton>
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default SimpleButtonEvent;
