import {DefaultTheme} from 'styled-components';

const CONTAINER = 1258;

const breakpoints = {
   md1: CONTAINER + 54,
   md2: 1024,
   md3: 768,
   md4: 480,
};

const CONTAINER_SIZES = {
   cnt1: 970,
   cnt2: 750,
};

const fontSize = {
   default: 16,
   pc: 20,
   mobile: 16,
};

export const layout = {
   designWidth: 1440,
   minWidth: 320,
   container: CONTAINER,
   ...breakpoints,
   ...CONTAINER_SIZES,
   fontSize,
   headerHeights: {
      pc: 80,
      mobile: 50,
      stickyPc: 50,
      stickyMobile: 40,
   },
};

const colorHelpers = {
   success: '#28a745',
   danger: '#dc3545',
   warning: '#ffc107',
};

const colorBasics = {
   white: '#fff',
   light: '#cecece',
   black: '#000',
   dark: '#333',
};

const palette = {
   color1: '#221e06',
   color2: '#625410',
   color3: '#f2d900',
   color4: '#fff59a',
   ...colorBasics,
   ...colorHelpers,
};

//! Avoid imports of this const, theme might change dynamically. Try recommended styled-components method or useTheme hook
const theme: DefaultTheme = {
   ...layout,
   ...palette,
   fontFamily: 'Unbounded, serif',
   color: palette.color4,
   background: palette.color1,
};

export default theme;
