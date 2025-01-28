import {useClickAway} from '@uidotdev/usehooks';
import {PropsWithChildren, RefObject} from 'react';
import {createPortal} from 'react-dom';
import styled, {keyframes, RuleSet} from 'styled-components';

import ModalProvider from '../../contexts/ModalContext';
import useModal from '../../hooks/useModal';
import ModalStyles from '../../styles/components/ModalStyles';
import rem from '../../styles/utils/rem';

const PortalEl = document.getElementById('portal')!;

const fadeAnimation = (show: boolean) => keyframes`
   from {
      opacity: ${Number(!show)};
   }
   to {
      opacity: ${Number(show)};
   }
`;
const perspectiveAnimation = (show: boolean) => keyframes`
   from {
      transform: perspective(${rem(600)}) translateY(${!show ? '0' : '-20%'}) scale(${!show ? '1' : '0.7'}) rotateX(${!show ? '0' : '45'}deg);
   }
   to {
      transform: perspective(${rem(600)}) translateY(${show ? '0' : '-20%'}) scale(${show ? '1' : '0.7'}) rotateX(${show ? '0' : '45'}deg);
   }
`;

const DURATION = 0.3;
const ModalEl = styled.dialog<{$styles?: RuleSet<object>}>`
   background: transparent;
   width: 100%;
   height: 100%;
   max-width: none;
   max-height: none;
   padding: ${rem(24)};

   transition:
      display ${DURATION}s allow-discrete,
      overlay ${DURATION}s allow-discrete;

   & {
      animation:
         ${fadeAnimation(false)} ${DURATION}s forwards,
         ${perspectiveAnimation(false)} ${DURATION}s forwards;
   }
   &::backdrop {
      animation: ${fadeAnimation(false)} ${DURATION}s forwards;

      background-color: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
   }
   &[open] {
      display: flex;
      justify-content: center;
      align-items: center;
      & {
         animation:
            ${fadeAnimation(true)} ${DURATION}s forwards,
            ${perspectiveAnimation(true)} ${DURATION}s forwards;
      }
      &::backdrop {
         animation: ${fadeAnimation(true)} ${DURATION}s forwards;
      }
   }

   ${({$styles}) => $styles}
`;
const ModalBody = styled.div<{$styles: RuleSet<object>}>`
   position: relative;
   margin: auto;

   ${({$styles}) => $styles}
`;

interface ModalComponentProps extends PropsWithChildren {
   dialogStyles?: RuleSet<object>;
   bodyStyles?: RuleSet<object>;
}
const ModalComponent = ({
   children,
   dialogStyles,
   bodyStyles = ModalStyles,
}: ModalComponentProps) => {
   const {ref, setIsOpen} = useModal();

   const bodyRef = useClickAway(() => {
      setIsOpen(false);
   });

   return (
      <ModalEl ref={ref} $styles={dialogStyles}>
         <ModalBody
            ref={bodyRef as RefObject<HTMLDivElement>}
            $styles={bodyStyles}
         >
            {children}
         </ModalBody>
      </ModalEl>
   );
};

interface ModalProps extends ModalComponentProps {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({
   isOpen,
   setIsOpen,
   dialogStyles,
   bodyStyles,
   children,
}: ModalProps) =>
   createPortal(
      <ModalProvider isOpen={isOpen} setIsOpen={setIsOpen}>
         <ModalComponent dialogStyles={dialogStyles} bodyStyles={bodyStyles}>
            {children}
         </ModalComponent>
      </ModalProvider>,
      PortalEl,
   );

export default Modal;
