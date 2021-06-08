import {
  DefaultButton,
  Separator,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { renderPayload } from './Object';

const Container = styled.div`
  overflow: hidden;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #888;
`;

const Base = styled.div`
  overflow: hidden;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;

  /* First child of base ROW should not be indented. */
  & > div > div {
    margin-left: 0;
  }
`;

const ObjectComponent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI',
    -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;

  & > div {
    margin-left: 1.5rem;
  }
`;

const styles = {
  parent: css`
    position: relative;

    ::before {
      content: ' ';
      margin-top: 1rem;
      margin-left: -0.5rem;
      position: absolute;
      display: inline-block;
      width: 0.5rem;
      height: 1px;
      background-color: #eee;
    }

    ::after {
      z-index: 0;
      content: ' ';
      position: absolute;
      display: inline-block;

      margin-top: 1rem;
      top: calc(-100% - 2px);
      left: -0.5rem;
      width: 1px;
      height: calc(100% + 2px);

      background-color: #eee;
    }
  `,
};

type Style = keyof typeof styles;

const Row = styled.div`
  margin-bottom: 2px;
  position: relative;

  ::before {
    content: ' ';
    margin-top: 1rem;
    margin-left: -0.5rem;
    position: absolute;
    display: inline-block;
    width: 0.5rem;
    height: 1px;
    background-color: #eee;
  }

  ::after {
    z-index: 0;
    content: ' ';
    position: absolute;
    display: inline-block;

    margin-top: 1rem;
    top: calc(-100% - 2px);
    left: -0.5rem;
    width: 1px;
    height: calc(100% + 2px);

    background-color: #eee;
  }
`;

const Key = styled.span`
  position: relative;
  z-index: 1;
  display: inline-block;
  padding: 0 0.5rem;
  height: 1;

  font-size: 0.8rem;
  padding: 0.5rem;
  background-color: #ddd;
`;
const Value = styled.span`
  height: 1;
  display: inline-block;
  font-size: 0.8rem;

  padding: 0.5rem;
  background-color: #eee;
`;

export const Payload = () => {
  const [payload, setPayload] = useState({
    armor: 25,
    health: 82,
    amount: { active: 30, reserve: 120 },
    insane: {
      what: 'Stop messing',
      dude: {
        status: 'wat',
      },
    },
  });
  const [input, setInput] = useState('');

  return (
    <Container>
      {/* <Base>
        <Object>
          <Row type="parent">
            <Key>armor</Key>
            <Value>25</Value>
          </Row>
          <Object>
            <Row type="parent">
              <Key>health</Key>
              <Value>75</Value>
            </Row>
            <Object>
              <Row type="parent">
                <Key>amount</Key>
                <Value>12</Value>
              </Row>
            </Object>
            <Object>
              <Row type="parent">
                <Key>amount</Key>
              </Row>
              <Object>
                <Row type="parent">
                  <Key>active</Key>
                  <Value>25</Value>
                </Row>
                <Row type="parent">
                  <Key>reserve</Key>
                  <Value>120</Value>
                </Row>
              </Object>
            </Object>
          </Object>
        </Object>
      </Base> */}

      <Base>{renderPayload(payload)}</Base>

      {/* <Stack horizontal>
        <Stack.Item>
          <TextField placeholder="key"></TextField>
        </Stack.Item>
        <Stack.Item>
          <TextField placeholder="value"></TextField>
        </Stack.Item>
      </Stack> */}

      <DefaultButton>Add key</DefaultButton>
    </Container>
  );
};

export default Payload;
