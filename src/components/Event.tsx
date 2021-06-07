import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { PostMessageEvent } from '../utils/events';
import { post } from '../utils/post';

export const Event = ({
  type,
  event,
  label,
  payload,
  buttonColor,
}: PostMessageEvent) => {
  const [toggleState, setToggleState] = useState(false);

  if (type === 'button') {
    return (
      <Button
        color={buttonColor}
        onClick={() => post({ type: event, payload })}
      >
        {label}
      </Button>
    );
  }

  if (type === 'toggle') {
    return (
      <Button
        active={toggleState}
        label={toggleState ? '(On)' : '(Off)'}
        content={label}
        color={buttonColor}
        onClick={() => {
          post({ type: event, payload: !toggleState });
          setToggleState(prev => !prev);
        }}
      />
    );
  }

  return null;
};

export default Event;
