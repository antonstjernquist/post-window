import React, { useState } from 'react';
import { Stack, DefaultButton, Text, PrimaryButton } from '@fluentui/react';
import styled from 'styled-components';
import { PostMessageEvent } from '../../utils/events';
import { EventHeader } from '../EventHeader';
import { Payload } from '../Payload';
import { post } from '../../utils/post';

const Container = styled.div``;

const Button = styled(DefaultButton)`
  margin-top: 1rem;
`;

interface ButtonEventProps {
  isEdit: boolean;
  event: PostMessageEvent;
  setEvents(events: PostMessageEvent[]): void;
}
export const ButtonEvent = ({ setEvents, event, isEdit }: ButtonEventProps) => {
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const handleSend = () => {
    console.log('sending ev', event);
    post({ payload: event.payload, type: event.event });
  };

  console.log('event', event);

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
      <EventHeader event={event} setEvents={setEvents} />

      <Payload
        event={event}
        setEvents={setEvents}
        isHelpVisible={isHelpVisible}
        onDismissHelp={() => setIsHelpVisible(false)}
      />

      <Stack>
        <Stack.Item align='end'>
          <Button disabled={!event.event} onClick={handleSend}>
            Send event
          </Button>
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default ButtonEvent;
