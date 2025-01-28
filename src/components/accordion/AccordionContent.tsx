import {motion} from 'motion/react';
import {PropsWithChildren, useState} from 'react';

import useAccordion from '../../hooks/useAccordion';

const AccordionContent = ({children}: PropsWithChildren) => {
   const {isOpened} = useAccordion();
   const [isVisible, setIsVisible] = useState(isOpened);

   const animation = isOpened
      ? {overflow: 'hidden', opacity: 1, height: 'auto'}
      : {overflow: 'hidden', opacity: 0, height: 0};

   const handleAnimationComplete = (isStart: boolean) => {
      if (isStart && isOpened) setIsVisible(true);
      if (!isStart && !isOpened) setIsVisible(false);
   };

   return (
      <motion.div
         style={isVisible ? {visibility: 'visible'} : {visibility: 'hidden'}}
         initial={animation}
         animate={animation}
         onAnimationStart={() => handleAnimationComplete(true)}
         onAnimationComplete={() => handleAnimationComplete(false)}
      >
         {children}
      </motion.div>
   );
};
export default AccordionContent;
