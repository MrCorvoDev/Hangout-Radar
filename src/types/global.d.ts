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
   startDate?: string;
   endDate?: string;
   searchQuery?: string;
   segmentId?: string | string[];
   genreId?: string | string[];
   country?: string | string[];
}
