import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {TicketmasterResponseType} from '../../types/ticketmaster';

const formatArrayParam = (param: string | string[]) =>
   Array.isArray(param) ? param.join(',') : param;

interface getEventsProps {
   page: number;
   keyword?: string;
   startDateTime?: string;
   endDateTime?: string;
   segmentId?: string | string[];
   genreId?: string | string[];
   countryCode?: string | string[];
}
export const ticketmasterApi = createApi({
   reducerPath: 'ticketmasterApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://app.ticketmaster.com/discovery/v2/',
   }),
   endpoints: builder => ({
      getEvents: builder.query<TicketmasterResponseType, getEventsProps>({
         query: ({
            page,
            keyword,
            startDateTime,
            endDateTime,
            segmentId,
            genreId,
            countryCode,
         }: getEventsProps) => {
            const params: Record<string, string> = {
               size: '20',
               apikey: import.meta.env.VITE_TICKETMASTER_API as string,
               sort: 'date,name,asc',
            };

            if (page) params.page = String(page);
            if (keyword) params.keyword = keyword;
            if (startDateTime) params.startDateTime = startDateTime;
            if (endDateTime) params.endDateTime = endDateTime;
            if (segmentId) params.segmentId = formatArrayParam(segmentId);
            if (genreId) params.genreId = formatArrayParam(genreId);
            if (countryCode) params.countryCode = formatArrayParam(countryCode);

            return {
               url: 'events.json',
               params,
            };
         },
      }),
   }),
});

export const {useGetEventsQuery} = ticketmasterApi;
export default ticketmasterApi;
