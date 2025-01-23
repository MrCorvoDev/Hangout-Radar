import {lazy} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Layout from './components/core/Layout';

const isDev = import.meta.env.MODE === 'development';
const basename = isDev ? '/' : (import.meta.env.VITE_PRODUCTION_ROOT as string);

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

const App = () => (
   <BrowserRouter basename={basename}>
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
         </Route>
      </Routes>
   </BrowserRouter>
);
export default App;
