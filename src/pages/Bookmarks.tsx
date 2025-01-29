import styled, {css} from 'styled-components';

import Container from '../components/core/Container';
import Section from '../components/core/Section';
import EventList from '../components/EventList';
import useAppSelector from '../hooks/useAppSelector';
import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';

const NoResults = styled.p`
   text-align: center;
   font-size: ${em(32)};
   font-weight: 700;
   font-family: 'Quicksand', sans-serif;
`;

const EventListEl = styled(EventList)`
   @media (${md(layout.md2, 'min')}) {
      grid-template-columns: 1fr 1fr 1fr;
   }
   @media (${md(layout.md2)}) and (${md(layout.md4, 'min')}) {
      grid-template-columns: 1fr 1fr;
   }
`;
const eventStyles = css`
   @media (${md(layout.md2, 'min')}) {
      flex-direction: column;
   }
   @media (${md(layout.md2)}) {
   }
   @media (${md(layout.md4)}) {
      font-size: 1.15em;
   }
`;

const About = () => {
   const bookmarks = useAppSelector(state => state.userBookmarks.bookmarks);
   const events = bookmarks;

   return (
      <Section>
         <Container>
            {events.length > 0 ? (
               <EventListEl events={events} eventStyles={eventStyles} />
            ) : (
               <NoResults>No Bookmarks(</NoResults>
            )}
         </Container>
      </Section>
   );
};
export default About;
