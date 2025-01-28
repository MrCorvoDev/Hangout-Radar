import {PropsWithChildren} from 'react';
import styled from 'styled-components';

import em from '../../styles/utils/em';

const LabelEl = styled.label`
   display: flex;
   flex-direction: column;
   gap: ${em(12)};
   font-family: 'Quicksand', sans-serif;
   font-weight: 700;
   span {
      font-size: ${em(24)};
   }
`;

interface LabelProps extends PropsWithChildren {
   title: string;
}
const Label = ({title, children}: LabelProps) => (
   <LabelEl>
      <span>{title}</span>
      {children}
   </LabelEl>
);
export default Label;
