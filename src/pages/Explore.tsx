import styled from 'styled-components';

import Container from '../components/core/Container';
import Section from '../components/core/Section';
import em from '../styles/utils/em';

const Headline = styled.h1`
   font-size: ${em(32)};
`;

const Explore = () => (
   <Section>
      <Container>
         <Headline>Explore</Headline>
      </Container>
   </Section>
);
export default Explore;
