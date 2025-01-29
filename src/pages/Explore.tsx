import {useEffect, useState} from 'react';
import styled from 'styled-components';

import ApiFallback from '../components/apiFallback';
import Container from '../components/core/Container';
import Section from '../components/core/Section';
import EventList from '../components/EventList';
import EventFiltersForm from '../components/form/EventFiltersForm';
import PagePagination from '../components/PagePagination';
import {useGetEventsQuery} from '../store/api/ticketmasterApi';
import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';
import {EventFiltersType} from '../types/global';

const Layout = styled.div`
   display: grid;
   grid-template-columns: ${em(330)} 1fr;
   gap: ${em(24)};
   @media (${md(layout.md1, 'min')}) {
      grid-template-columns: ${em(360)} 1fr;
   }
   @media (${md(layout.md3)}) {
      grid-template-columns: 1fr;
   }
`;
const Aside = styled.aside``;
const FallbackBox = styled.div`
   display: flex;
   justify-content: center;
   padding: ${em(32)} 0;
`;
const NoResults = styled.p`
   text-align: center;
   font-size: ${em(32)};
   font-weight: 700;
   font-family: 'Quicksand', sans-serif;
`;

const Explore = () => {
   const [page, setPage] = useState(0);
   const [filters, setFilters] = useState<EventFiltersType>({});

   const {data, isLoading, error} = useGetEventsQuery({
      page,
      ...filters,
   });
   const showFallback = isLoading || error;

   const stringFilter = JSON.stringify(filters);
   useEffect(() => {
      setPage(0);
      window.scrollTo(0, 0);
   }, [stringFilter]);

   const events = data?._embedded?.events?.filter(
      (event, index, self) =>
         index === self.findIndex(e => e.name === event.name),
   );

   return (
      <Section>
         <Container>
            <Layout>
               <Aside>
                  <EventFiltersForm setFilters={setFilters} />
               </Aside>
               {showFallback ? (
                  <FallbackBox>
                     <ApiFallback isLoading={isLoading} error={error} />
                  </FallbackBox>
               ) : data!._embedded ? (
                  <>
                     <EventList events={events!} />
                     <PagePagination
                        apiTotalPages={data?.page.totalPages ?? 0}
                        page={page}
                        setPage={setPage}
                     />
                  </>
               ) : (
                  <NoResults>No results(</NoResults>
               )}
            </Layout>
         </Container>
      </Section>
   );
};
export default Explore;
