import {ComponentProps} from 'react';
import {Link} from 'react-router-dom';

import useHeader from '../../hooks/useHeader';

interface HeaderLinkProps extends ComponentProps<'a'> {
   to: string;
}
const HeaderLink = ({to, children, ...props}: HeaderLinkProps) => {
   const {isMenuOpened, toggleMenu} = useHeader();

   const handleMenuClose = () => isMenuOpened && toggleMenu();

   return (
      <Link to={to} onClick={handleMenuClose} {...props}>
         {children}
      </Link>
   );
};
export default HeaderLink;
