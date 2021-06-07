import React from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Button, Tag, Tooltip } from 'antd';
import { ITab as IEventTab } from '../utils/tabs';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
`;

const SendEvent = styled(Button)`
  margin-left: auto;
`;

export interface EventTabProps extends IEventTab {}

export const EventTab = (props: EventTabProps) => {
  return (
    <>
      <Container>
        <Title level={3}>{props.name ?? 'lol'}</Title>

        <Tooltip title={props.name}>
          <SendEvent type="primary" size="large" icon={<DoubleRightOutlined />}>
            Send event
          </SendEvent>
        </Tooltip>
      </Container>
    </>
  );
};

export default EventTab;
