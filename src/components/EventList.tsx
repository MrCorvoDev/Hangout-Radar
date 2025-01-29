import styled from 'styled-components';

import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';
import {TicketmasterResponseType} from '../types/ticketmaster';
import Event from './Event';

const EventListEl = styled.div`
   display: grid;
   grid-template-columns: 1fr;
   gap: ${em(24)};
   @media (${md(layout.md3)}) and (${md(layout.md4, 'min')}) {
      grid-template-columns: 1fr 1fr;
   }
`;

interface EventListProps {
   events: TicketmasterResponseType['_embedded']['events'];
}
const EventList = ({events}: EventListProps) => (
   <EventListEl>
      {events.map(event => (
         <Event key={event.id} event={event} />
      ))}
   </EventListEl>
);
export default EventList;
