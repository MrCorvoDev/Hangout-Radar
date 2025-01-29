import {ComponentProps} from 'react';
import styled, {css} from 'styled-components';

import useTag from '../../hooks/useTag';
import em from '../../styles/utils/em';
import Tag from '../Tag';

const DateTagEl = styled(Tag)<{$isActive?: boolean}>`
   font-size: ${em(18)};
   flex: 1 1 auto;
   ${({$isActive}) =>
      $isActive
         ? css`
              background: ${props => props.theme.color4 as string};
              color: ${props => props.theme.color2 as string};
           `
         : css`
              background: ${props => props.theme.color1 as string};
           `}
`;

interface DateTagProps extends ComponentProps<typeof DateTagEl> {
   name: string;
   groupId?: string;
}
const DateTag = ({name, groupId = 'global', ...props}: DateTagProps) => {
   const {tags} = useTag();

   const isActive = tags[groupId]?.find(tag => tag.name === name)?.isActive;

   return (
      <DateTagEl
         name={name}
         groupId={groupId}
         $isActive={isActive}
         {...props}
      />
   );
};
export default DateTag;
