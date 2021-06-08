import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Typography,
  Input,
  Space,
  Radio,
  RadioChangeEvent,
  Divider,
  Tree,
  Button,
  Badge,
} from 'antd';
import { ITab } from '../utils/tabs';
import { DataNode } from 'antd/lib/tree';

const { Title } = Typography;
const Container = styled.div``;

const options = [
  { label: 'Button', value: 'button' },
  { label: 'Toggle', value: 'toggle' },
  { label: 'Slider', value: 'slider' },
];

export interface CreateEventProps {
  tab: ITab;
}
export const CreateEvent = (props: CreateEventProps) => {
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const [actionType, setActionType] = useState('');
  const [payloadType, setPayloadType] = useState('');

  const [payload, setPayload] = useState<DataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    '0-0-0',
    '0-0-1',
  ]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  const onChange = (value: RadioChangeEvent) => {
    console.log('Changed to:', value);
    setActionType(value.target.value);
  };

  const addLeaf = () => {
    setPayload([...payload, { key: keyInput, title: valueInput }]);
    setValueInput('');
    setKeyInput('');
  };

  const payloadOptions = [
    { label: 'String', value: 'string', disabled: actionType !== 'button' },
    { label: 'Object', value: 'object', disabled: actionType !== 'button' },
    { label: 'Toggle', value: 'toggle', disabled: actionType !== 'toggle' },
    { label: 'Slider', value: 'slider', disabled: actionType !== 'slider' },
  ];

  return (
    <Container>
      <Space direction='horizontal'>
        <Title level={5}>New event</Title>
      </Space>
      <Badge status='processing' style={{ marginLeft: '0.5rem' }} />

      <Space direction='vertical'>
        <Space>
          <Input placeholder='Open the nui' addonBefore='Name'></Input>
          <Input placeholder='SET_VISIBILITY' addonBefore='Event'></Input>
        </Space>

        <Radio.Group
          options={options}
          onChange={onChange}
          value={actionType}
          optionType='button'
          buttonStyle='solid'
        />
      </Space>

      <Divider />
      <Title level={5}>Payload</Title>

      <Radio.Group
        options={payloadOptions}
        onChange={event => setPayloadType(event.target.value)}
        value={payloadType}
        optionType='button'
        buttonStyle='solid'
      />

      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={payload}
      ></Tree>

      <Input.Group compact>
        <Input
          placeholder='Key'
          style={{ width: '25%' }}
          value={keyInput}
          onChange={event => setKeyInput(event.target.value)}
        />
        <Input.Search
          placeholder='Value'
          enterButton='Add leaf'
          disabled={!keyInput}
          onSearch={addLeaf}
          style={{ width: '50%' }}
          value={valueInput}
          onChange={event => setValueInput(event.target.value)}
        />
      </Input.Group>
    </Container>
  );
};

export default CreateEvent;
