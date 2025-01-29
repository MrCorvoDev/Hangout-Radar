import {Dispatch, useEffect} from 'react';
import styled from 'styled-components';

import useTag from '../../hooks/useTag';
import em from '../../styles/utils/em';
import {EventFiltersType} from '../../types/global';
import DateTag from './DateTag';

const now = new Date();
const formatDate = (date: Date) => date.toISOString().split('.')[0] + 'Z';
const getDateByDay = (day: number) => {
   const date = new Date();
   date.setDate(date.getDate() + day);

   return date;
};
type DateRangeType = 'week' | 'weekend' | 'month';
const getDatesRange = (range: DateRangeType) => {
   let startDateTime = now,
      endDateTime = now;

   switch (range) {
      case 'week':
         endDateTime = getDateByDay(
            now.getDate() + ((7 - now.getDay() + 7) % 7),
         );
         break;
      case 'weekend':
         startDateTime = getDateByDay(
            now.getDate() + ((5 - now.getDay() + 7) % 7),
         );
         endDateTime = getDateByDay(
            now.getDate() + ((8 - now.getDay() + 7) % 7),
         );
         break;
      case 'month':
         endDateTime = getDateByDay(now.getDate() + 30);
         break;
   }

   return [formatDate(startDateTime), formatDate(endDateTime)];
};

const DatesFlex = styled.div`
   display: flex;
   gap: ${em(6)};
   flex: 1 1 auto;
`;

interface EventDatesProps {
   setFilters: Dispatch<React.SetStateAction<EventFiltersType>>;
}
const EventDates = ({setFilters}: EventDatesProps) => {
   const {tags} = useTag();

   useEffect(() => {
      const type = tags.dates
         ?.find(tag => tag.isActive)
         ?.name.toLocaleLowerCase() as DateRangeType;

      if (type) {
         const [startDateTime, endDateTime] = getDatesRange(type);
         setFilters(prev => ({...prev, startDateTime, endDateTime}));
      } else {
         setFilters(prev => ({...prev, startDateTime: '', endDateTime: ''}));
      }
   }, [setFilters, tags]);

   return (
      <DatesFlex>
         <DateTag name='Week' groupId='dates' />
         <DateTag name='Weekend' groupId='dates' />
         <DateTag name='Month' groupId='dates' />
      </DatesFlex>
   );
};
export default EventDates;
