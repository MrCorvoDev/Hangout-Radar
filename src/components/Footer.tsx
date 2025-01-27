import {faSlidersH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useLocalStorage} from '@uidotdev/usehooks';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/logo.svg';
import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';
import Container from './core/Container';
import Image from './core/Image';
import Survey from './survey/Survey';

const FooterEL = styled.footer`
   background-color: ${({theme}) => theme.color2 as string};
   padding: ${em(24)} 0;
   border-radius: 16px 16px 0 0;
`;

const FooterBody = styled(Container)`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: ${em(16)};
   @media (${md(layout.md3)}) {
      flex-direction: column;
   }
`;

const Logo = styled(Link)`
   font-size: ${em(38)};
   position: relative;
   z-index: 2;
   img {
      height: 1em;
   }
`;
const RetakeSurveyButton = styled.button`
   font-size: ${em(24)};
   padding: ${em(4, 24)};
   @media (hover: hover) {
      &:hover {
         color: ${({theme}) => theme.color3 as string};
      }
   }
`;

const Footer = () => {
   const [isOpen, setIsOpen] = useLocalStorage('shouldShowSurvey', true);

   return (
      <FooterEL>
         <FooterBody>
            <Logo to=''>
               <Image src={logo} alt='Hangout Radar Logo' />
            </Logo>
            <RetakeSurveyButton
               type='button'
               onClick={() => setIsOpen(true)}
               title='Take Preference Survey'
            >
               <FontAwesomeIcon icon={faSlidersH} />
            </RetakeSurveyButton>
            <Survey isOpen={isOpen} setIsOpen={setIsOpen} />
         </FooterBody>
      </FooterEL>
   );
};
export default Footer;
