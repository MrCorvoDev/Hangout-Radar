import {ComponentProps} from 'react';
import styled, {RuleSet} from 'styled-components';

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

interface EventListProps extends ComponentProps<'div'> {
   events: TicketmasterResponseType['_embedded']['events'];
   eventStyles?: RuleSet<object>;
}
const EventList = ({events, eventStyles, ...props}: EventListProps) => (
   <EventListEl {...props}>
      {events.map(event => (
         <Event key={event.id} event={event} eventStyles={eventStyles} />
      ))}
   </EventListEl>
);
export default EventList;
