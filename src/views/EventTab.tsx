import React, { useState } from 'react';
import { PlusOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Button, Tooltip, Divider, Modal, Table, message } from 'antd';
import { ITab as IEventTab, ITab, updateTab } from '../utils/tabs';
import styled from 'styled-components';
import { Typography } from 'antd';
import CreateEvent from '../components/CreateEvent';

const { Title } = Typography;

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
`;

const SendEvent = styled(Button)`
  margin-right: 1rem;
`;

export interface EventTabProps extends IEventTab {
  setTabs(tabs: ITab[]): void;
}

export const EventTab = (props: EventTabProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const handleSuccess = () => {
    message.success('Successfully added an event!', 2.5);
    setIsCreatingEvent(false);
  };

  const handleStopEditing = () => {
    setIsEdit(false);
  };

  const handleTabEditName = (tab: string, name: string) => {
    updateTab({ id: tab, name, events: props.events }).then(props.setTabs);
  };

  return (
    <>
      <Container>
        <Title
          level={5}
          onClick={() => setIsEdit(prev => !prev)}
          editable={{
            icon: ' ',
            editing: isEdit,
            maxLength: 32,
            autoSize: true,
            tooltip: true,
            onCancel: handleStopEditing,
            onEnd: handleStopEditing,
            onChange: name => handleTabEditName(props.id, name),
          }}
        >
          {props.name}
        </Title>

        <Divider orientation='left' style={{ margin: '0.5rem 0 2rem' }} />

        <div>
          <SendEvent
            size='large'
            icon={<PlusOutlined />}
            onClick={() => setIsCreatingEvent(true)}
          >
            Create new event
          </SendEvent>

          <Tooltip title={props.name}>
            <SendEvent
              disabled={props.events.length === 0}
              type='primary'
              size='large'
              icon={<DoubleRightOutlined />}
            >
              Send all events
            </SendEvent>
          </Tooltip>
        </div>

        <Modal
          okText='Create event'
          visible={isCreatingEvent}
          onOk={handleSuccess}
          onCancel={() => setIsCreatingEvent(false)}
        >
          <CreateEvent tab={{ ...props }} />
        </Modal>
      </Container>
    </>
  );
};

export default EventTab;
