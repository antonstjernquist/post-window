import { DefaultButton, PrimaryButton, Stack, Toggle } from '@fluentui/react';
import React, { useState } from 'react';
import { EventType, PostMessageEvent } from '../utils/events';
import { post } from '../utils/post';
import ButtonEvent from './ButtonEvent';

interface EventProps extends PostMessageEvent {
  setEvents(events: PostMessageEvent[]): void;
}
export const Event = (event: EventProps) => {
  const [toggleState, setToggleState] = useState(false);

  if (event.type === EventType.BUTTON) {
    return <ButtonEvent {...event} setEvents={event.setEvents} />;
  }

  if (event.type === EventType.TOGGLE) {
    return (
      <Stack.Item>
        <span>{event.name}</span>
        <Toggle
          checked={toggleState}
          onClick={() => {
            post({ type: event.event, payload: !toggleState });
            setToggleState(prev => !prev);
          }}
        />
      </Stack.Item>
    );
  }

  return null;
};

export default Event;
