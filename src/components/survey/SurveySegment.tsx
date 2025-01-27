import {useEffect} from 'react';
import styled from 'styled-components';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import useTag from '../../hooks/useTag';
import {SegmentType} from '../../store/api/localDataApi';
import {updateSegments} from '../../store/slices/userPreferenceSlice';
import em from '../../styles/utils/em';
import Tag from '../Tag';

const Title = styled.h3`
   font-size: ${em(32)};
   font-weight: 700;
   font-family: 'Quicksand', sans-serif;
   margin-bottom: ${em(12, 32)};
`;
const Tags = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: ${em(6)};
`;

interface SurveySegmentProps {
   segment: SegmentType;
   index: number;
}
const SurveySegment = ({segment, index}: SurveySegmentProps) => {
   const {tags} = useTag();
   const dispatch = useAppDispatch();
   const userSegments = useAppSelector(state => state.userPreferences.segments);

   useEffect(() => {
      const genres = segment.genres.filter((genre, index) => {
         const tag = tags.global[index];

         return tag && tag.isActive && tag.name === genre.name;
      });

      const updatedUserSegments = userSegments.map(userSegment => {
         if (userSegment.id === segment.id) {
            return {
               ...userSegment,
               genres,
            };
         }
         return userSegment;
      });

      if (
         JSON.stringify(updatedUserSegments) !== JSON.stringify(userSegments)
      ) {
         dispatch(updateSegments(updatedUserSegments));
      }
   }, [dispatch, segment.genres, segment.id, tags.global, userSegments]);

   return (
      <>
         <Title>{segment.name}</Title>

         <Tags>
            {segment.genres.map(genre => (
               <Tag
                  key={genre.id}
                  name={genre.name}
                  defaultActive={
                     !!userSegments[index].genres.find(
                        userGenre => userGenre.name === genre.name,
                     )
                  }
               />
            ))}
         </Tags>
      </>
   );
};
export default SurveySegment;
