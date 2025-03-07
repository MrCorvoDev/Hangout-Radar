import {useEffect} from 'react';
import styled from 'styled-components';

import {TagProvider} from '../../contexts/TagContext';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {SegmentType} from '../../store/api/localDataApi';
import {updateSegments} from '../../store/slices/userPreferenceSlice';
import em from '../../styles/utils/em';
import SurveySegment from './SurveySegment';

const SurveyInterestsEl = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(24)};
`;

interface SurveySegmentsProps {
   segments: SegmentType[];
}
const SurveySegments = ({segments}: SurveySegmentsProps) => {
   const userSegments = useAppSelector(state => state.userPreferences.segments);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!userSegments.length)
         dispatch(
            updateSegments(
               segments.map(segment => ({
                  ...segment,
                  genres: [],
               })),
            ),
         );
   }, [dispatch, segments, userSegments.length]);

   return (
      userSegments.length !== 0 && (
         <SurveyInterestsEl>
            {segments?.map((segment, index) => (
               <TagProvider key={segment.id}>
                  <SurveySegment segment={segment} index={index} />
               </TagProvider>
            ))}
         </SurveyInterestsEl>
      )
   );
};
export default SurveySegments;
