import React from 'react';
import styled from 'styled-components';

// const Base = styled.div`
//   overflow: hidden;
//   margin-bottom: 0.5rem;
//   padding-bottom: 0.5rem;

//   /* First child of base ROW should not be indented. */
//   & > div > div {
//     margin-left: 0;
//   }
// `;

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

const Key = styled.span<{ isObject?: boolean }>`
  position: relative;
  z-index: 1;
  display: inline-block;
  padding: 0 0.5rem;
  height: 1;

  font-size: 0.8rem;
  padding: 0.5rem;
  background-color: #ddd;

  ${({ isObject }) =>
    isObject &&
    `
    border: 1px solid #ddd;
    background-color: #fefefe;
  `}
`;

const Value = styled.span`
  height: 1;
  display: inline-block;
  font-size: 0.8rem;

  padding: 0.5rem;
  background-color: #eee;
`;

interface Obj<T> {
  [key: string]: T;
}
type CircularObj = Obj<string | number | CircularObj>;

export interface RenderPayloadOptions {
  onValueEdit(path: string[]): void;
}
export const renderPayload = (
  payload: CircularObj,
  options: RenderPayloadOptions,
  path = [] as string[],
  deep = 0
) => {
  if (deep > 3) {
    console.log('Too deep, abort');
    return null;
  }

  return (
    <ObjectComponent>
      {Object.keys(payload).map(key => {
        const k = key as keyof typeof payload;
        const value = payload[k];

        if (typeof value !== 'object') {
          return (
            <ObjectComponent key={key}>
              <Row>
                {key && <Key>{key}</Key>}
                <Value onClick={() => options.onValueEdit([...path, key])}>
                  {value}
                </Value>
              </Row>
            </ObjectComponent>
          );
        }

        return (
          <ObjectComponent>
            <Row>
              <Key isObject>{key}</Key>
            </Row>
            {renderPayload(value, options, [...path, key], deep + 1)}
          </ObjectComponent>
        );
      })}
    </ObjectComponent>
  );
};
