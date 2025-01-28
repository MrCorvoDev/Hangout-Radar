import {css} from 'styled-components';

import em from '../utils/em';

const SelectFontSize = 21;
const SelectStyles = css`
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
      .react-select__indicator svg {
         fill: ${props => props.theme.color4 as string};
         stroke: ${props => props.theme.color4 as string};
      }
      .react-select__multi-value__remove {
         @media (hover: hover) {
            &:hover {
               background: ${props => props.theme.color1 as string};
            }
         }
      }
   }

   .react-select__value-container {
      padding-left: 0;
      padding-right: 0;
      div {
         color: ${props => props.theme.color4 as string};
      }
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
export default SelectStyles;
