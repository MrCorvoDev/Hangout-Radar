export type Types =
   | 'string'
   | 'number'
   | 'NaN'
   | 'object'
   | 'array'
   | 'boolean'
   | 'null'
   | 'undefined';

export interface EventFiltersType {
   startDateTime?: string;
   endDateTime?: string;
   keyword?: string;
   segmentId?: string | string[];
   genreId?: string | string[];
   countryCode?: string | string[];
}
