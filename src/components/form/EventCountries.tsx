import {Dispatch, useEffect, useState} from 'react';
import Select, {GroupBase, OptionsOrGroups} from 'react-select';
import styled from 'styled-components';

import useAppSelector from '../../hooks/useAppSelector';
import {CountryType, useGetCountriesQuery} from '../../store/api/localDataApi';
import SelectStyles from '../../styles/components/SelectStyles';
import {EventFiltersType} from '../../types/global';
import ApiFallback from '../ApiFallback';
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
const convertCountriesToOptions = (countries: CountryType[]): OptionType[] =>
   countries.map(country => ({
      label: country.name,
      value: country.code,
   }));

const convertOptionsToParams = (
   options: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
) => (options as OptionType[]).map(option => option.value);

interface EventCountriesProps {
   setFilters: Dispatch<React.SetStateAction<EventFiltersType>>;
}
const EventCountries = ({setFilters}: EventCountriesProps) => {
   const {countries: userCountries} = useAppSelector(
      state => state.userPreferences,
   );
   const [selectedOptions, setSelectedOptions] = useState(
      convertCountriesToOptions(userCountries),
   );

   const {data: countries, error, isLoading} = useGetCountriesQuery();
   const showFallback = isLoading || error;

   useEffect(() => {
      setFilters(prev => ({
         ...prev,
         countryCode: convertOptionsToParams(selectedOptions),
      }));
   }, [selectedOptions, setFilters]);

   useEffect(() => {
      setSelectedOptions(convertCountriesToOptions(userCountries));
   }, [userCountries]);

   return (
      <>
         {showFallback ? (
            <ApiFallback isLoading={isLoading} error={error} />
         ) : (
            <Label title='Country'>
               <SelectStylesContainer>
                  <Select
                     isMulti
                     options={convertCountriesToOptions(countries!)}
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
export default EventCountries;
