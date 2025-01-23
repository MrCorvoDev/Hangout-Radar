import {motion} from 'motion/react';
import {PropsWithChildren} from 'react';

import useAccordion from '../../hooks/useAccordion';

const AccordionContent = ({children}: PropsWithChildren) => {
   const {isOpened} = useAccordion();
   const animation = isOpened
      ? {overflow: 'visible', opacity: 1, height: 'auto'}
      : {overflow: 'hidden', opacity: 0, height: 0};

   return (
      <motion.div
         style={isOpened ? {visibility: 'visible'} : {visibility: 'hidden'}}
         initial={animation}
         animate={animation}
      >
         {children}
      </motion.div>
   );
};
export default AccordionContent;
