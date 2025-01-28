import {css} from 'styled-components';

import {layout} from '../theme';
import em from '../utils/em';
import maxWidth from '../utils/maxWidth';

const ModalStyles = css`
   ${maxWidth(800, layout.designWidth)}
   width: 100%;
   padding: ${em(52)} ${em(32)} ${em(32)};
   border-radius: 16px;
   background: ${({theme: {background}}) => background as string};
`;

export default ModalStyles;
