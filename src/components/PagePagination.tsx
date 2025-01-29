import styled, {css} from 'styled-components';

import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';

const PagePaginationEl = styled.div`
   display: flex;
   justify-content: center;
   gap: ${em(8)};
   margin: 0 auto;
   @media (${md(layout.md3, 'min')}) {
      grid-column: 2 / 2;
   }
`;
const PageButtonActiveStyles = css`
   background-color: ${props => props.theme.color4 as string};
   color: ${props => props.theme.color1 as string};
`;
const PageButton = styled.button<{$isActive?: boolean}>`
   padding: ${em(8)} ${em(16)};
   border-radius: 4px;
   background-color: ${props => props.theme.color2 as string};
   color: ${props => props.theme.color4 as string};
   transition: 0.3s;
   font-weight: 700;
   font-family: 'Quicksand', sans-serif;
   ${props => props.$isActive && PageButtonActiveStyles}
   @media (hover: hover) {
      &:hover {
         ${PageButtonActiveStyles}
      }
   }
`;

const MAX_PAGES = 4;

interface PagePaginationProps {
   page: number;
   setPage: React.Dispatch<React.SetStateAction<number>>;
   apiTotalPages: number;
}
const PagePagination = ({
   page,
   setPage,
   apiTotalPages,
}: PagePaginationProps) => {
   const totalPages = apiTotalPages > MAX_PAGES ? MAX_PAGES : apiTotalPages;

   if (apiTotalPages === 0) return null;

   return (
      <PagePaginationEl>
         {Array.from({length: totalPages}).map((_, index) => (
            <PageButton
               key={index}
               onClick={() => setPage(index)}
               $isActive={page === index}
            >
               {index + 1}
            </PageButton>
         ))}
      </PagePaginationEl>
   );
};
export default PagePagination;
