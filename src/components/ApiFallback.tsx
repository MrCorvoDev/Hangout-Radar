import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

import Spinner from './loading/Spinner';

interface ApiFallbackProps {
   isLoading: boolean;
   error: FetchBaseQueryError | SerializedError | undefined;
}
const ApiFallback = ({isLoading, error}: ApiFallbackProps) => (
   <>
      {isLoading ? (
         <Spinner />
      ) : error ? (
         <>
            <p>Error: {'status' in error ? error.status : error.message}</p>
            <p>Please reload the page</p>
         </>
      ) : null}
   </>
);
export default ApiFallback;
