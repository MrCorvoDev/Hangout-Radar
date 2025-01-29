import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled, {css} from 'styled-components';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import {addBookmark, removeBookmark} from '../store/slices/userBookmarksSlice';
import ButtonStyles from '../styles/components/ButtonStyles';
import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';
import {EventType} from '../types/ticketmaster';
import parseEvent from '../utils/parseEvent';
import Image from './core/Image';

const EventEl = styled.article`
   display: flex;
   overflow: hidden;
   border-radius: 16px;
   @media (${md(layout.md3)}) {
   }
   @media (${md(layout.md2)}) {
      flex-direction: column;
   }
   @media (${md(layout.md4)}) {
      font-size: 1.15em;
   }
`;
const EventImage = styled.div`
   aspect-ratio: 16 / 9;
   position: relative;
   @media (${md(layout.md3, 'min')}) {
      min-width: ${em(200)};
   }
   @media (${md(layout.md2, 'min')}) {
      min-width: ${em(360)};
   }
   @media (${md(layout.md1, 'min')}) {
      min-width: ${em(420)};
   }
   img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
   }
`;
const EventBody = styled.div`
   flex: 1 1 auto;
   padding: ${em(8)} ${em(24)} ${em(16)};
   background: ${props => props.theme.color2 as string};
   display: flex;
   flex-direction: column;
`;
const EventContent = styled.div`
   flex: 1 1 auto;
   display: flex;
   flex-direction: column;
   gap: ${em(12)};
   margin-bottom: ${em(32)};
`;
const EventTopFlex = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: ${em(8)};
`;
const EventDate = styled.p`
   font-size: ${em(14)};
   font-weight: 700;
   padding: ${em(8)} ${em(12)};
   border-radius: 8px;
   background: ${props => props.theme.color1 as string};
   color: ${props => props.theme.color4 as string};
`;
const EventBookmark = styled.button<{$isActive: boolean}>`
   font-size: ${em(36)};
   width: 1em;
   height: 1em;
   display: inline-flex;
   justify-content: center;
   align-items: center;
   border-radius: 50%;
   background: ${props => props.theme.color1 as string};
   color: ${props => props.theme.color2 as string};
   transition: 0.3s;
   transition-timing-function: ease-in;
   @media (hover: hover) {
      &:hover {
         color: ${props => props.theme.color4 as string};
      }
   }
   &:active {
      transition: 0.1s;
      transform: scale(1.2);
   }
   svg {
      font-size: ${em(14, 36)};
   }
   ${props =>
      props.$isActive &&
      css`
         background: ${props => props.theme.color1 as string};
         color: ${props => props.theme.color3 as string};
         @media (hover: hover) {
            &:hover {
               color: ${props => props.theme.color3 as string};
            }
         }
      `}
`;
const EventTitle = styled.h2`
   font-family: 'Quicksand', sans-serif;
   font-size: ${em(28)};
   font-weight: 700;
   margin-bottom: ${em(8, 28)};
   display: -webkit-box;
   -webkit-line-clamp: 4;
   -webkit-box-orient: vertical;
   overflow: hidden;
   text-overflow: ellipsis;
   padding: 0.1em 0;
`;
const EventGenres = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: ${em(6)};
`;
const EventGenre = styled.span`
   font-family: 'Quicksand', sans-serif;
   font-size: ${em(15)};
   font-weight: 700;
   padding: ${em(4)} ${em(8)};
   border-radius: 8px;
   background-color: ${props => props.theme.color1 as string};
`;
const EventButton = styled.a`
   ${ButtonStyles}
   text-align: center;
   background-color: ${props => props.theme.color1 as string};
   width: 100%;
`;

interface EventProps {
   event: EventType;
}
const Event = ({event}: EventProps) => {
   const dispatch = useAppDispatch();
   const userBookmarks = useAppSelector(state => state.userBookmarks.bookmarks);

   const parsedEvent = parseEvent(event);
   const {url, name, image, genres, date, city} = parsedEvent;
   const isBookmarked = userBookmarks.some(
      bookmark => bookmark.id === event.id,
   );

   return (
      <EventEl>
         <EventImage>
            <Image src={image.url} alt={name} />
         </EventImage>
         <EventBody>
            <EventContent>
               <EventTopFlex>
                  <EventDate>
                     {city} - {date}
                  </EventDate>
                  <EventBookmark
                     type='button'
                     $isActive={isBookmarked}
                     onClick={() =>
                        isBookmarked
                           ? dispatch(removeBookmark(parsedEvent.id))
                           : dispatch(addBookmark(parsedEvent))
                     }
                  >
                     <FontAwesomeIcon icon={faBookmark} />
                  </EventBookmark>
               </EventTopFlex>
               <EventTitle>{name}</EventTitle>
               {genres.length > 0 && (
                  <EventGenres>
                     {genres.map(genre => (
                        <EventGenre key={genre}>{genre}</EventGenre>
                     ))}
                  </EventGenres>
               )}
            </EventContent>
            <EventButton href={url} target='_blank' rel='noopener noreferrer'>
               <span>View Event</span>
            </EventButton>
         </EventBody>
      </EventEl>
   );
};
export default Event;
