import {createContext, PropsWithChildren, useLayoutEffect, useRef} from 'react';

import useLockScroll from '../hooks/useLockScroll';

interface ModalContextType {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   ref: React.RefObject<HTMLDialogElement | null>;
}
export const ModalContext = createContext({} as ModalContextType);

interface ModalProviderProps extends PropsWithChildren {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalProvider = ({isOpen, setIsOpen, children}: ModalProviderProps) => {
   const ref = useRef<ModalContextType['ref']['current']>(null);

   useLockScroll(isOpen);

   useLayoutEffect(() => {
      const dialog = ref.current;

      if (dialog && isOpen) {
         dialog.showModal();
      } else if (dialog) {
         dialog.close();
      }
   }, [isOpen]);

   return (
      <ModalContext.Provider value={{isOpen, setIsOpen, ref}}>
         {children}
      </ModalContext.Provider>
   );
};

export default ModalProvider;
