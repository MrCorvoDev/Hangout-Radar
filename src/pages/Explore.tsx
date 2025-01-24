import styled from 'styled-components';

import Container from '../components/core/Container';
import Section from '../components/core/Section';
import useURLState from '../hooks/useURLState';
import em from '../styles/utils/em';

const Box = styled.div`
   display: inline-flex;
   flex-direction: column;
   align-items: center;
   gap: ${em(16)};
   padding: ${em(16)};
   border-radius: ${em(8)};
   background-color: ${({theme}) => theme.color2 as string};
`;

const Count = styled.div`
   font-size: ${em(24)};
   font-weight: 700;
`;

const FlexContainer = styled.div`
   display: flex;
   align-items: center;
   gap: ${em(8)};
`;

const Button = styled.button`
   background-color: ${({theme}) => theme.color3 as string};
   color: ${({theme}) => theme.color2 as string};
   border-radius: 8px;
   padding: ${em(10)} ${em(20)};
   min-width: ${em(200)};
`;

const Explore = () => {
   const [count, setCount] = useURLState<number>('count', 0);

   return (
      <Section>
         <Container>
            <Box>
               <Count>{count}</Count>
               <FlexContainer>
                  <Button onClick={() => setCount(count + 1)}>Increment</Button>
                  <Button onClick={() => setCount(count - 1)}>Decrement</Button>
               </FlexContainer>
            </Box>
         </Container>
      </Section>
   );
};
export default Explore;
