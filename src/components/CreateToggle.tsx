import React, { useState } from 'react';
import styled from 'styled-components';
import { ITab } from '../utils/tabs';
import {
  FontIcon,
  IStackTokens,
  PrimaryButton,
  Separator,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';
import { createEvent, EventType, PostMessageEvent } from '../utils/events';
import { uuidv4 } from '../utils/uuid';

const Container = styled.div`
  padding: 2rem;
`;

const verticalGapStackTokens: IStackTokens = {
  childrenGap: 10,
};

export interface CreateEventProps {
  tab: ITab;
  onDismiss(): void;
  setEvents(events: PostMessageEvent[]): void;
}
export const CreateEvent = (props: CreateEventProps) => {
  const [name, setName] = useState('');
  const [event, setEvent] = useState('');

  return (
    <Container>
      <Stack horizontal tokens={verticalGapStackTokens}>
        <Stack.Item align="baseline">
          <Text variant="xLarge">New Toggle</Text>
        </Stack.Item>
        <Stack.Item align="baseline">
          <FontIcon iconName="Info"></FontIcon>
        </Stack.Item>
      </Stack>
      <Separator />

      <Stack tokens={verticalGapStackTokens}>
        <Stack horizontal tokens={verticalGapStackTokens}>
          <Stack.Item>
            <TextField
              label="Name"
              placeholder="Toggle NUI"
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />
          </Stack.Item>

          <Stack.Item>
            <TextField
              label="Event"
              placeholder="SET_NUI_VISIBILITY"
              value={event}
              onChange={e => setEvent(e.currentTarget.value)}
            />
          </Stack.Item>
        </Stack>

        <Stack.Item align="end">
          <PrimaryButton
            onClick={() => {
              createEvent({
                tabId: props.tab.id,
                event,
                name,
                payload: '',
                type: EventType.TOGGLE,
              }).then(props.setEvents);
              props.onDismiss();
            }}
          >
            Create event
          </PrimaryButton>
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default CreateEvent;
