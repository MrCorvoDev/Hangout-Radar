import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

import Spinner from '../loading/Spinner';

interface SurveyFallbackProps {
   isLoading: boolean;
   error: FetchBaseQueryError | SerializedError | undefined;
}
const SurveyFallback = ({isLoading, error}: SurveyFallbackProps) => (
   <>
      {isLoading ? (
         <Spinner />
      ) : error ? (
         <p>Error: {'status' in error ? error.status : error.message}</p>
      ) : null}
   </>
);
export default SurveyFallback;
