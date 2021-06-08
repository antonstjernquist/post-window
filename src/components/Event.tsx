import { DefaultButton, PrimaryButton, Stack, Toggle } from '@fluentui/react';
import React, { useState } from 'react';
import { EventType, PostMessageEvent } from '../utils/events';
import { post } from '../utils/post';

export const Event = ({ type, event, name, payload }: PostMessageEvent) => {
  const [toggleState, setToggleState] = useState(false);

  if (type === EventType.BUTTON) {
    return (
      <Stack.Item>
        <PrimaryButton onClick={() => post({ type: event, payload })}>
          {name}
        </PrimaryButton>
      </Stack.Item>
    );
  }

  if (type === EventType.TOGGLE) {
    return (
      <Stack.Item>
        <span>{name}</span>
        <Toggle
          checked={toggleState}
          onClick={() => {
            post({ type: event, payload: !toggleState });
            setToggleState(prev => !prev);
          }}
        />
      </Stack.Item>
    );
  }

  return null;
};

export default Event;
