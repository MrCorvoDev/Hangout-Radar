import {Dispatch, useEffect, useState} from 'react';
import Select, {GroupBase, OptionsOrGroups} from 'react-select';
import styled from 'styled-components';

import useAppSelector from '../../hooks/useAppSelector';
import {SegmentType, useGetSegmentsQuery} from '../../store/api/localDataApi';
import SelectStyles from '../../styles/components/SelectStyles';
import {EventFiltersType} from '../../types/global';
import ApiFallback from '../apiFallback';
import Label from './Label';

const SelectStylesContainer = styled.div`
   ${SelectStyles}
   .react-select__multi-value {
      background: ${props => props.theme.color1 as string};
   }
`;

interface OptionType {
   label: string;
   value: string;
}
const convertSegmentsToOptions = (segments: SegmentType[]) => {
   const options: OptionType[] = [];

   segments.forEach(segment => {
      const segmentName = segment.name;
      const segmentId = segment.id;

      segment.genres.forEach(genre => {
         options.push({
            label: `${segmentName} > ${genre.name}`,
            value: `${segmentId} ${genre.id}`,
         });
      });
   });

   return options;
};
const convertOptionsToParams = (
   options: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
) => {
   let segments: string[] = [];
   let genres: string[] = [];

   (options as OptionType[]).forEach(option => {
      const [segmentId, genreId] = option.value.split(' ');

      segments.push(segmentId);
      genres.push(genreId);
   });

   segments = segments.filter(
      (value, index) => segments.indexOf(value) === index,
   );
   genres = genres.filter((value, index) => genres.indexOf(value) === index);

   return {segments, genres};
};

interface EventSegmentsProps {
   setFilters: Dispatch<React.SetStateAction<EventFiltersType>>;
}
const EventSegments = ({setFilters}: EventSegmentsProps) => {
   const userSegments = useAppSelector(state => state.userPreferences.segments);
   const [selectedOptions, setSelectedOptions] = useState(
      convertSegmentsToOptions(userSegments),
   );

   const {data: segments, error, isLoading} = useGetSegmentsQuery();
   const showFallback = isLoading || error;

   useEffect(() => {
      const {segments, genres} = convertOptionsToParams(selectedOptions);

      setFilters(prev => ({
         ...prev,
         segmentId: segments,
         genreId: genres,
      }));
   }, [segments, setFilters, userSegments, selectedOptions]);

   useEffect(() => {
      setSelectedOptions(convertSegmentsToOptions(userSegments));
   }, [userSegments]);

   return (
      <>
         {showFallback ? (
            <ApiFallback isLoading={isLoading} error={error} />
         ) : (
            <Label title='Genres'>
               <SelectStylesContainer>
                  <Select
                     isMulti
                     options={convertSegmentsToOptions(segments!)}
                     className='react-select'
                     classNamePrefix='react-select'
                     value={selectedOptions}
                     onChange={options => {
                        setSelectedOptions([...options]);
                     }}
                  />
               </SelectStylesContainer>
            </Label>
         )}
      </>
   );
};
export default EventSegments;
