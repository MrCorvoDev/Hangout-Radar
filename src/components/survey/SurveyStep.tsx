import {PropsWithChildren} from 'react';
import styled from 'styled-components';

import em from '../../styles/utils/em';
import {SurveyStepType} from './Survey';

const SurveyStepEl = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(16)};
   margin-bottom: ${em(64)};
`;
const Title = styled.h2`
   font-size: ${em(40)};
   font-weight: 700;
   font-family: 'Quicksand', sans-serif;
`;
const Description = styled.p`
   font-size: ${em(24)};
   margin-bottom: ${em(16)};
`;

const SurveyStep = ({
   title,
   description,
   children,
}: SurveyStepType & PropsWithChildren) => (
   <SurveyStepEl>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {children}
   </SurveyStepEl>
);
export default SurveyStep;
