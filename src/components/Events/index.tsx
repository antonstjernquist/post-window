import { FluentTheme } from '@fluentui/react';
import React from 'react';
import styled from 'styled-components';
import { EventType, PostMessageEvent } from '../../utils/events';
import ButtonEvent from './AdvancedButton';
import SimpleButtonEvent from './Button';
import SliderEvent from './Slider';
import ToggleEvent from './Toggle';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  box-shadow: ${FluentTheme.effects.elevation8};
`;

interface EventProps {
  isEdit: boolean;
  event: PostMessageEvent;
  setEvents(events: PostMessageEvent[]): void;
}
export const Event = ({ setEvents, event, isEdit }: EventProps) => {
  if (event.type === EventType.BUTTON) {
    return (
      <Container>
        <ButtonEvent event={event} setEvents={setEvents} isEdit={isEdit} />
      </Container>
    );
  }

  if (event.type === EventType.TOGGLE) {
    return (
      <Container>
        <ToggleEvent event={event} setEvents={setEvents} isEdit={isEdit} />
      </Container>
    );
  }

  if (event.type === EventType.SLIDER) {
    return (
      <Container>
        <SliderEvent event={event} setEvents={setEvents} isEdit={isEdit} />
      </Container>
    );
  }

  if (event.type === EventType.SIMPLE) {
    return (
      <Container>
        <SimpleButtonEvent
          event={event}
          setEvents={setEvents}
          isEdit={isEdit}
        />
      </Container>
    );
  }

  console.log('NO EVENT! ?!?!', event);

  return <span>wtf</span>;
};

export default Event;
