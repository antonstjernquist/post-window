import { DefaultButton, Stack, Text, TextField } from '@fluentui/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { renderPayload } from './Object';
import { assocPath, dissocPath, hasPath } from 'ramda';
import { PostMessageEvent, setEvents, updateEvent } from '../utils/events';
import Tutorial from './Tutorial';
import { enterValueSlowly } from '../utils/animation';

const Container = styled.div`
  overflow: hidden;
  margin-top: 1rem;
`;

const Base = styled.div`
  overflow: hidden;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  padding: 1rem;

  /* First child of base ROW should not be indented. */
  & > div > div {
    margin-left: 0;
  }
`;

const PayloadText = styled(Text)`
  margin-top: 1.5rem;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  background-color: #eee;
`;

interface PayloadProps {
  event: PostMessageEvent;
  isHelpVisible: boolean;
  onDismissHelp: () => void;
}

export const Payload = (props: PayloadProps) => {
  let initialPayload;
  try {
    if (props.event.payload) {
      initialPayload = JSON.parse(props.event.payload);
    }
  } catch (e) {
    console.log('Failed to parse payload for event', e);
  }

  const [payload, setPayload] = useState(initialPayload ?? {});
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const keys = keyInput.split('.');

  const hasValue = hasPath(keys, payload);

  const handleAddPayload = () => {
    if (!keyInput) {
      setPayload(valueInput);
      return;
    }

    const newPayload = valueInput
      ? assocPath(keys, valueInput, payload)
      : dissocPath(keys, payload);

    setPayload(newPayload);
    updateEvent({ ...props.event, payload: JSON.stringify(newPayload) }).then(
      setEvents
    );
    setValueInput('');
    setKeyInput('');
  };

  const handleValueEdit = (path: string[]) => {
    console.log('Changing key:', path);
  };

  return (
    <Container>
      <PayloadText variant='small' id={`tutorial-${props.event.id}-1`}>
        Payload
      </PayloadText>
      <Base>{renderPayload(payload, { onValueEdit: handleValueEdit })}</Base>

      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <TextField
            id={`tutorial-${props.event.id}-2`}
            value={keyInput}
            onChange={event => setKeyInput(event.currentTarget.value)}
            prefix='KEY'
            placeholder='amount.active'
          />
        </Stack.Item>

        <Stack.Item>
          <TextField
            id={`tutorial-${props.event.id}-3`}
            value={valueInput}
            onChange={event => setValueInput(event.currentTarget.value)}
            prefix='VALUE'
            placeholder='25'
          />
        </Stack.Item>

        <Stack.Item>
          {!hasValue && (
            <DefaultButton
              id={`tutorial-${props.event.id}-4`}
              disabled={!valueInput}
              onClick={handleAddPayload}
              iconProps={{ iconName: 'Add' }}
            >
              Add
            </DefaultButton>
          )}

          {hasValue && (
            <DefaultButton
              id={`tutorial-${props.event.id}-4`}
              onClick={handleAddPayload}
              iconProps={{ iconName: valueInput ? 'Edit' : 'Delete' }}
            >
              {valueInput ? 'Edit' : 'Delete'}
            </DefaultButton>
          )}
        </Stack.Item>
      </Stack>
    </Container>
  );
};

export default Payload;
