import {ComponentProps, useEffect} from 'react';
import styled, {css} from 'styled-components';

import useTag from '../hooks/useTag';
import em from '../styles/utils/em';

const TagEl = styled.button<{$isActive?: boolean}>`
   font-size: ${em(16)};
   font-weight: 700;
   border-radius: 16px;
   padding: ${em(8, 18)} ${em(16, 18)};
   transition: 0.3s;
   ${({$isActive}) =>
      $isActive
         ? css`
              background: ${props => props.theme.color4 as string};
              color: ${props => props.theme.color2 as string};
           `
         : css`
              background: ${props => props.theme.color2 as string};
           `}
`;

interface TagProps extends ComponentProps<'button'> {
   name: string;
   groupId?: string;
   defaultActive?: boolean;
}
const Tag = ({name, groupId = 'global', defaultActive, ...props}: TagProps) => {
   const {tags, handleClick, register} = useTag();

   const isActive = tags[groupId]?.find(tag => tag.name === name)?.isActive;

   useEffect(
      () => register(name, groupId, defaultActive),
      [register, name, groupId, defaultActive],
   );

   return (
      <TagEl
         type='button'
         onClick={() => handleClick(name, groupId)}
         $isActive={isActive}
         {...props}
      >
         {name}
      </TagEl>
   );
};
export default Tag;
