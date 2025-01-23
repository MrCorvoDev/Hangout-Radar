import styled from 'styled-components';

import em from '../../styles/utils/em';

const Box = styled.div`
   display: inline-flex;
   flex-direction: column;
   align-self: flex-start;
   gap: ${em(10)};
   padding: ${em(16)};
   margin: ${em(24)};
   border-radius: 8px;
   background-color: ${({theme}) => theme.color2 as string};
   p {
      font-size: ${em(22)};
      font-weight: 700;
   }
`;

interface ErrorBoundaryFallbackProps {
   error: Error;
}
const ErrorBoundaryFallback = ({error}: ErrorBoundaryFallbackProps) => (
   <Box role='alert'>
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
   </Box>
);
export default ErrorBoundaryFallback;
