export interface TicketmasterResponseType {
   _embedded: {
      events: EventType[];
   };
   _links: PaginationLinksType;
   page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
   };
}

export interface EventType {
   name: string;
   type: string;
   id: string;
   test: boolean;
   url: string;
   locale: string;
   images: ImageType[];
   sales: {
      public: {
         startDateTime: string;
         startTBD: boolean;
         startTBA: boolean;
         endDateTime: string;
      };
   };
   dates: {
      start: {
         localDate: string;
         localTime: string;
         dateTime: string;
         dateTBD: boolean;
         dateTBA: boolean;
         timeTBA: boolean;
         noSpecificTime: boolean;
      };
      timezone: string;
      status: {
         code: string;
      };
      spanMultipleDays: boolean;
   };
   classifications: ClassificationType[];
   accessibility?: Record<string, unknown>;
   ageRestrictions?: {
      legalAgeEnforced: boolean;
   };
   ticketing?: {
      safeTix: {
         enabled: boolean;
      };
   };
   _links: EventLinksType;
   _embedded?: {
      venues: VenueType[];
      attractions: AttractionType[];
   };
}

export interface ImageType {
   ratio: string;
   url: string;
   width: number;
   height: number;
   fallback: boolean;
}

export interface ClassificationType {
   primary: boolean;
   segment: {
      id: string;
      name: string;
   };
   genre: {
      id: string;
      name: string;
   };
   subGenre?: {
      id: string;
      name: string;
   };
   type?: {
      id: string;
      name: string;
   };
   subType?: {
      id: string;
      name: string;
   };
   family: boolean;
}

export interface VenueType {
   name: string;
   type: string;
   id: string;
   test: boolean;
   url: string;
   locale: string;
   postalCode: string;
   timezone: string;
   city: {
      name: string;
   };
   country: {
      name: string;
      countryCode: string;
   };
   address: {
      line1: string;
   };
   location: {
      longitude: string;
      latitude: string;
   };
   markets: MarketType[];
   dmas: DMAType[];
   upcomingEvents: {
      ticketmaster: number;
      _total: number;
      _filtered: number;
   };
   _links: {
      self: {
         href: string;
      };
   };
}

export interface AttractionType {
   name: string;
   type: string;
   id: string;
   test: boolean;
   url: string;
   locale: string;
   images: ImageType[];
   classifications: ClassificationType[];
   upcomingEvents: {
      ticketmaster: number;
      _total: number;
      _filtered: number;
   };
   _links: {
      self: {
         href: string;
      };
   };
}

export interface MarketType {
   name: string;
   id: string;
}

export interface DMAType {
   id: number;
}

export interface EventLinksType {
   self: {
      href: string;
   };
   attractions?: {
      href: string;
   }[];
   venues?: {
      href: string;
   }[];
}

export interface PaginationLinksType {
   first?: {
      href: string;
   };
   self: {
      href: string;
   };
   next?: {
      href: string;
   };
   last?: {
      href: string;
   };
}
