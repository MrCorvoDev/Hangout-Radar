import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface CountryType {
   name: string;
   code: string;
}
export interface GenreType {
   id: string;
   name: string;
}
export interface SegmentType {
   id: string;
   name: string;
   genres: GenreType[];
}

const isDev = import.meta.env.MODE === 'development';
const basename = isDev ? '/' : (import.meta.env.VITE_PRODUCTION_ROOT as string);

export const localDataApi = createApi({
   reducerPath: 'localDataApi',
   baseQuery: fetchBaseQuery({baseUrl: `${basename}data/`}),
   endpoints: builder => ({
      getCountries: builder.query<CountryType[], void>({
         query: () => 'countries.json',
      }),
      getSegments: builder.query<SegmentType[], void>({
         query: () => 'segments.json',
      }),
   }),
});

export const {useGetCountriesQuery, useGetSegmentsQuery} = localDataApi;
