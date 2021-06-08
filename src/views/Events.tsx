// import React, { useEffect, useState } from 'react';
// import { Event } from '../components/Event';
// import { getEvents, PostMessageEvent } from '../utils/events';

// export const Events = () => {
//   const [refresh, setRefresh] = useState(false);
//   const [events, setEvents] = useState<PostMessageEvent[]>([]);

//   useEffect(() => {
//     getEvents().then(setEvents);
//   }, [getEvents, setEvents, refresh]);

//   return (
//     <div>
//       <Grid columns={2}>
//         <Grid.Column>
//           <Header>Events</Header>
//         </Grid.Column>
//         <Grid.Column>
//           <Icon
//             style={{ marginLeft: 'auto', display: 'block' }}
//             size='large'
//             name='refresh'
//             onClick={() => setRefresh(prev => !prev)}
//           />
//         </Grid.Column>
//       </Grid>

//       <Divider />

//       {events.map(event => {
//         return <Event {...event} />;
//       })}
//     </div>
//   );
// };

// export default Events;
