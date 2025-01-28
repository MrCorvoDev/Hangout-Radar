import {Dispatch, useEffect} from 'react';
import styled from 'styled-components';

import useTag from '../../hooks/useTag';
import em from '../../styles/utils/em';
import {EventFiltersType} from '../../types/global';
import DateTag from './DateTag';

const now = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];
const getDateByDay = (day: number) => {
   const date = new Date();
   date.setDate(date.getDate() + day);

   return date;
};
type DateRangeType = 'week' | 'weekend' | 'month';
const getDatesRange = (range: DateRangeType) => {
   let dateFrom = now,
      dateTo = now;

   switch (range) {
      case 'week':
         dateTo = getDateByDay(now.getDate() + ((7 - now.getDay() + 7) % 7));
         break;
      case 'weekend':
         dateFrom = getDateByDay(now.getDate() + ((6 - now.getDay() + 7) % 7));
         dateTo = getDateByDay(now.getDate() + ((7 - now.getDay() + 7) % 7));
         break;
      case 'month':
         dateTo = getDateByDay(now.getDate() + 30);
         break;
   }

   return [formatDate(dateFrom), formatDate(dateTo)];
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
         const [dateFrom, dateTo] = getDatesRange(type);
         setFilters(prev => ({...prev, dateFrom, dateTo}));
      } else {
         setFilters(prev => ({...prev, dateFrom: '', dateTo: ''}));
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
