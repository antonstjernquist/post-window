// import React, { useState } from 'react';
// import {
//   Button,
//   Divider,
//   Dropdown,
//   DropdownItemProps,
//   Header,
//   Input,
// } from 'semantic-ui-react';
// import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
// import { createEvent, PostMessageEventType } from '../utils/events';

// const EVENT_TYPE_OPTIONS = [
//   {
//     key: 'button',
//     text: 'Button',
//     value: 'button',
//   },
//   {
//     key: 'toggle',
//     text: 'Toggle',
//     value: 'toggle',
//   },
//   {
//     key: 'slider',
//     text: 'Slider',
//     value: 'slider',
//   },
// ];
// export const CreateEvent = () => {
//   const [event, setEvent] = useState('');
//   const [label, setLabel] = useState('');
//   const [payload, setPayload] = useState('');

//   const [type, setType] = useState<PostMessageEventType>('button');
//   const [buttonColor, setButtonColor] = useState<SemanticCOLORS>();

//   const handleCreateEvent = () => {
//     createEvent({
//       type,
//       event,
//       label,
//       payload,
//       buttonColor,
//     });
//   };

//   return (
//     <div>
//       <Header>{event ? `Creating event (${event})` : 'Create event'}</Header>

//       <Input
//         focus
//         fluid
//         label="Event"
//         placeholder="SET_NUI_OPEN"
//         value={event}
//         onChange={event => setEvent(event.target.value)}
//       />

//       <Input
//         fluid
//         label="Label"
//         placeholder="Open the NUI"
//         value={label}
//         onChange={event => setLabel(event.target.value)}
//         style={{ marginTop: '0.5rem' }}
//       />

//       <Input
//         fluid
//         label="Payload"
//         placeholder="true"
//         value={payload}
//         onChange={event => setPayload(event.target.value)}
//         style={{ marginTop: '0.5rem' }}
//       />

//       <Divider hidden />

//       <Dropdown
//         basic
//         button
//         fluid
//         header="Event type"
//         value={type}
//         placeholder="Button, Toggle, Slider .."
//         onChange={(_e, { value }) => setType(value as PostMessageEventType)}
//         options={EVENT_TYPE_OPTIONS}
//       />

//       {['button', 'toggle'].includes(type ?? '') && (
//         <Dropdown
//           basic
//           button
//           placeholder="Yellow, blue, green, black"
//           fluid
//           text={buttonColor}
//           header="Button color"
//           style={{ marginTop: '0.5rem' }}
//         >
//           <Dropdown.Menu>
//             <Dropdown.Header content="Color"></Dropdown.Header>
//             <Dropdown.Item
//               onClick={() => setButtonColor('yellow')}
//               label={{ color: 'yellow', empty: true, circular: true }}
//               text="Yellow"
//             ></Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => setButtonColor('green')}
//               label={{ color: 'green', empty: true, circular: true }}
//               text="Green"
//             ></Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => setButtonColor('blue')}
//               label={{ color: 'blue', empty: true, circular: true }}
//               text="Blue"
//             ></Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => setButtonColor('black')}
//               label={{ color: 'black', empty: true, circular: true }}
//               text="Black"
//             ></Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => setButtonColor('red')}
//               label={{ color: 'red', empty: true, circular: true }}
//               text="Red"
//             ></Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       )}

//       <Divider hidden />

//       <Button
//         primary
//         floated="right"
//         disabled={!event || !label || !type}
//         onClick={handleCreateEvent}
//       >
//         Create event
//       </Button>
//     </div>
//   );
// };

// export default CreateEvent;
