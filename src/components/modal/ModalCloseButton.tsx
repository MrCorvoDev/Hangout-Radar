import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {PropsWithChildren} from 'react';
import styled from 'styled-components';

import useModal from '../../hooks/useModal';
import em from '../../styles/utils/em';

const FONT_SIZE = 32;
const Button = styled.button`
   position: absolute;
   font-size: ${em(28)};
   top: ${em(6, FONT_SIZE)};
   right: ${em(6, FONT_SIZE)};
   padding: ${em(6, FONT_SIZE)};
   transition: 0.3s;
   @media (hover: hover) {
      &:hover {
         color: ${({theme}) => theme.color3 as string};
      }
   }
   svg {
      width: 1em;
   }
`;

const ModalCloseButton = ({children}: PropsWithChildren) => {
   const {setIsOpen} = useModal();

   return (
      <Button type='button' onClick={() => setIsOpen(false)}>
         {children ? children : <FontAwesomeIcon icon={faTimes} />}
      </Button>
   );
};
export default ModalCloseButton;
