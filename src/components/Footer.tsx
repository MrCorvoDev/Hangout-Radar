import {Link} from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/logo.svg';
import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';
import Container from './core/Container';
import Image from './core/Image';

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
const Copyright = styled.p`
   font-size: ${em(18)};
   font-weight: 700;
   font-family: 'Mulish', sans-serif;
`;

const Footer = () => (
   <FooterEL>
      <FooterBody>
         <Logo to=''>
            <Image src={logo} alt='Hangout Radar Logo' />
         </Logo>
         <Copyright>&copy; {new Date().getFullYear()}</Copyright>
      </FooterBody>
   </FooterEL>
);
export default Footer;
