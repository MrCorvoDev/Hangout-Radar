import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDebounce, useMediaQuery} from '@uidotdev/usehooks';
import {Dispatch, useEffect, useState} from 'react';
import styled from 'styled-components';

import AccordionProvider from '../../contexts/AccordionContext';
import {TagProvider} from '../../contexts/TagContext';
import useAccordion from '../../hooks/useAccordion';
import {layout} from '../../styles/theme';
import em from '../../styles/utils/em';
import md from '../../styles/utils/md';
import {EventFiltersType} from '../../types/global';
import AccordionButton from '../accordion/AccordionButton';
import AccordionContent from '../accordion/AccordionContent';
import EventCountries from './EventCountries';
import EventDates from './EventDates';
import EventSegments from './EventSegments';
import Input from './Input';
import Label from './Label';

const Form = styled.form`
   padding: ${em(24)} ${em(16)};
   background: ${props => props.theme.color2 as string};
   border-radius: 8px;
`;
const FlexTopBar = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: ${em(8)};
   @media (${md(layout.md3)}) {
      gap: ${em(24)};
   }
`;
const FilterIcon = styled(AccordionButton)`
   transition: 0.3s;
   @media (hover: hover) {
      &:hover {
         color: ${props => props.theme.color3 as string};
      }
   }
`;
const FormBody = styled.div`
   padding-top: ${em(32)};
   display: flex;
   flex-direction: column;
   gap: ${em(16)};
`;

interface EventFiltersFormComponentProps extends EventFiltersFormProps {
   isPC: boolean;
}
const EventFiltersFormComponent = ({
   setFilters,
   isPC,
}: EventFiltersFormComponentProps) => {
   const [searchQuery, setSearchQuery] = useState('');
   const debouncedSearchQuery = useDebounce(searchQuery, 500);
   const {isOpened, toggle} = useAccordion();

   useEffect(() => {
      setFilters(prev => ({...prev, keyword: debouncedSearchQuery}));
   }, [debouncedSearchQuery, setFilters]);

   useEffect(() => {
      if (isPC && !isOpened) toggle();
      if (!isPC && isOpened) toggle();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isPC]);

   return (
      <Form>
         <FlexTopBar>
            <EventDates setFilters={setFilters} />
            {!isPC && (
               <FilterIcon>
                  <FontAwesomeIcon icon={faFilter} />
               </FilterIcon>
            )}
         </FlexTopBar>
         <AccordionContent>
            <FormBody>
               <Label title='Search'>
                  <Input
                     name='search'
                     type='text'
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                  />
               </Label>
               <EventCountries setFilters={setFilters} />
               <EventSegments setFilters={setFilters} />
            </FormBody>
         </AccordionContent>
      </Form>
   );
};

interface EventFiltersFormProps {
   setFilters: Dispatch<React.SetStateAction<EventFiltersType>>;
}
const EventFiltersForm = ({setFilters}: EventFiltersFormProps) => {
   const isPC = useMediaQuery(`(${md(layout.md3, 'min')})`);

   return (
      <AccordionProvider defaultOpened={isPC}>
         <TagProvider>
            <EventFiltersFormComponent setFilters={setFilters} isPC={isPC} />
         </TagProvider>
      </AccordionProvider>
   );
};

export default EventFiltersForm;
