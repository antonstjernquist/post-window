import { Slider, Stack, Text, TextField } from '@fluentui/react';
import React, { FormEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { PostMessageEvent } from '../../utils/events';
import { EventHeader } from '../EventHeader';
import throttle from 'lodash.throttle';
import { post } from '../../utils/post';

const Container = styled.div``;

export interface SliderEventProps {
  isEdit: boolean;
  event: PostMessageEvent;
  setEvents(events: PostMessageEvent[]): void;
}
export const SliderEvent = ({ isEdit, event, setEvents }: SliderEventProps) => {
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('10');

  const setValue =
    (type: 'min' | 'max') =>
    (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      if (!Number(value)) return;

      type === 'min' && setMin(value);
      type === 'max' && setMax(value);
    };

  const throttledPost = throttle(post, 100);

  if (!isEdit) {
    return (
      <Stack>
        <Stack.Item>
          <Text variant='medium'>{event.name}</Text>
        </Stack.Item>
        <Stack.Item>
          <Slider
            styles={{ root: { flex: '1' } }}
            min={Number(min)}
            max={Number(max)}
            onChange={payload => throttledPost({ type: event.event, payload })}
          />
        </Stack.Item>
      </Stack>
    );
  }

  return (
    <Container>
      <EventHeader event={event} setEvents={setEvents} />

      <Stack
        horizontal
        style={{ marginTop: '0.5rem' }}
        tokens={{ childrenGap: 8 }}
      >
        <Stack.Item>
          <TextField
            placeholder='Min'
            value={min}
            type='number'
            onChange={setValue('min')}
          />
        </Stack.Item>
        <Stack.Item>
          <TextField
            placeholder='Max'
            value={max}
            type='number'
            onChange={setValue('max')}
          />
        </Stack.Item>
      </Stack>

      <Slider
        min={Number(min)}
        max={Number(max)}
        onChange={payload => throttledPost({ type: event.event, payload })}
      />
    </Container>
  );
};

export default SliderEvent;
