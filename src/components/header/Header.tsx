import Color from 'color';
import styled from 'styled-components';

import logo from '../../assets/logo.svg';
import {HeaderProvider} from '../../contexts/HeaderContext';
import useHeader from '../../hooks/useHeader';
import em from '../../styles/utils/em';
import lockPadding from '../../styles/utils/lockPadding';
import Container from '../core/Container';
import Image from '../core/Image';
import HeaderLink from './HeaderLink';
import Menu from './Menu';

const PlaceHolder = styled.div`
   height: var(--headerH);
`;

const HeaderBody = styled(Container)`
   display: flex;
   justify-content: space-between;
   align-items: center;
   transition: 0.3s;
`;

interface HeaderProps {
   $isSticky?: boolean | undefined;
   Color?: Color;
}
const HeaderEl = styled.header<HeaderProps>`
   --background: ${({theme}) =>
      Color(theme.color2).lightness(33.5).alpha(0.6).hexa()};
   --blur: 5px;
   position: fixed;
   width: 100%;
   top: 0;
   left: 0;
   z-index: 100;
   ${lockPadding()}
   &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--background);
      z-index: 2;
      backdrop-filter: blur(var(--blur));
   }

   ${HeaderBody} {
      height: var(${({$isSticky}) => ($isSticky ? '--headerSH' : '--headerH')});
   }
`;

const Logo = styled(HeaderLink)`
   font-size: ${em(38)};
   position: relative;
   z-index: 2;
   img {
      height: 1em;
   }
`;

const HeaderElement = () => {
   const {isSticky} = useHeader();

   return (
      <HeaderEl $isSticky={isSticky}>
         <HeaderBody>
            <Logo to=''>
               <Image src={logo} alt='Hangout Radar Logo' />
            </Logo>
            <Menu />
         </HeaderBody>
      </HeaderEl>
   );
};

const Header = () => (
   <HeaderProvider>
      <PlaceHolder />
      <HeaderElement />
   </HeaderProvider>
);

export default Header;
