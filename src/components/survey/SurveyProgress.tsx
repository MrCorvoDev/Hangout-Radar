import styled from 'styled-components';

import em from '../../styles/utils/em';

const ProgressEl = styled.div`
   display: flex;
   align-items: center;
   gap: ${em(5)};
   margin-bottom: ${em(24)};
`;
const Dot = styled.div<{$active: boolean}>`
   width: ${em(10)};
   height: ${em(10)};
   border-radius: 50%;
   transition: 0.3s;
   background-color: ${props =>
      props.$active
         ? (props.theme.color4 as string)
         : (props.theme.color2 as string)};
`;

interface SurveyProgressProps {
   progress: number;
   length: number;
}
const SurveyProgress = ({progress, length}: SurveyProgressProps) => (
   <ProgressEl>
      {Array.from({length}).map((_, index) => (
         <Dot key={index} $active={index < progress + 1} />
      ))}
   </ProgressEl>
);
export default SurveyProgress;
