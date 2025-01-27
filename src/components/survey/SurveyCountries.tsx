import Select from 'react-select';
import styled from 'styled-components';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {CountryType} from '../../store/api/localDataApi';
import {updateCountries} from '../../store/slices/userPreferenceSlice';
import em from '../../styles/utils/em';

const SelectFontSize = 21;
const SelectStylesContainer = styled.div`
   .react-select__control {
      font-size: ${em(SelectFontSize)};
      min-height: ${em(64, SelectFontSize)};
      padding: 0 ${em(20, SelectFontSize)};
      background: transparent;
      border: 2px solid currentColor;
      border-radius: 5px;
      width: 100%;
      @media (hover: hover) {
         &:hover {
            border-color: currentColor;
         }
      }
   }
   .react-select__value-container div {
      color: ${props => props.theme.color4 as string};
   }
   .react-select__multi-value {
      background: ${props => props.theme.color2 as string};
   }
   .react-select__indicator svg {
      transition: 0.3s;
   }
   .react-select__control--is-focused {
      box-shadow: none;
      outline-color: white !important;
      outline-offset: 0px !important;
      outline-style: auto !important;
      outline-width: 1px !important;
      .react-select__indicator svg {
         fill: ${props => props.theme.color4 as string};
         stroke: ${props => props.theme.color4 as string};
      }
   }
   .react-select__control--menu-is-open .react-select__indicator svg {
      transform: rotate(180deg);
   }
   .react-select__indicator-separator {
      display: none;
   }
   .react-select__single-value {
      color: currentColor;
   }
   .react-select__menu {
      background: ${props => props.theme.color1 as string};
      border: 2px solid currentColor;
   }
   .react-select__option {
      padding: 0 ${em(20, SelectFontSize)};
      min-height: ${em(48, SelectFontSize)};
      display: flex;
      align-items: center;
      @media (hover: hover) {
         &:hover {
            background: ${props => props.theme.color2 as string};
         }
      }
   }
   .react-select__option--is-selected {
      background: ${props => props.theme.color2 as string};
   }
   .react-select__option--is-focused {
      background: ${props => props.theme.color2 as string};
   }
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
