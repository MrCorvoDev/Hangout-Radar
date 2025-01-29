import Select from 'react-select';
import styled from 'styled-components';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {CountryType} from '../../store/api/localDataApi';
import {updateCountries} from '../../store/slices/userPreferenceSlice';
import SelectStyles from '../../styles/components/SelectStyles';

const SelectStylesContainer = styled.div`
   ${SelectStyles}
`;

interface SurveyCountriesProps {
   countries: CountryType[];
}
const SurveyCountries = ({countries}: SurveyCountriesProps) => {
   const dispatch = useAppDispatch();
   const userPreferredCountries = useAppSelector(
      state => state.userPreferences.countries,
   );
   const selectCountries = userPreferredCountries.map(country => ({
      label: country.name,
      value: country.code,
   }));
   const data = countries.map(country => ({
      label: country.name,
      value: country.code,
   }));

   return (
      <SelectStylesContainer>
         <Select
            isMulti
            options={data}
            className='react-select'
            classNamePrefix='react-select'
            value={selectCountries}
            onChange={values => {
               const selectedCountries: CountryType[] = values.map(value => ({
                  name: value.label,
                  code: value.value,
               }));
               dispatch(updateCountries(selectedCountries));
            }}
         />
      </SelectStylesContainer>
   );
};
export default SurveyCountries;
