import { Dispatch } from 'redux';

import { ResponseType } from '../api/todolists-api';

import { ARRAY_ELEMENT_ZERO } from 'constants/baseConstants';
import { setAppStatus, setErrorLog } from 'store';

// generic function
export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch,
): void => {
  if (data.messages.length) {
    dispatch(setErrorLog(data.messages[ARRAY_ELEMENT_ZERO]));
  } else {
    dispatch(setErrorLog('Some error occurred'));
  }
  dispatch(setAppStatus('failed'));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch,
): void => {
  dispatch(setErrorLog(error.message));
  dispatch(setAppStatus('failed'));
};
