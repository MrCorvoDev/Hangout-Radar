import {lazy} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Layout from './components/core/Layout';

const isDev = import.meta.env.MODE === 'development';
const basename = isDev ? '/' : (import.meta.env.VITE_PRODUCTION_ROOT as string);

const Explore = lazy(() => import('./pages/Explore'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));

const App = () => (
   <BrowserRouter basename={basename}>
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Explore />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
         </Route>
      </Routes>
   </BrowserRouter>
);
export default App;
