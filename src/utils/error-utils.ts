import { Dispatch } from 'redux';

import { ResponseType } from '../api/todolists-api';
import {
  setAppStatusAC,
  setErrorLogAC,
  setErrorLogACType,
  setStatusACType,
} from '../store/reducers/appReducer';

import { ARRAY_ELEMENT_ZERO } from 'constants/baseConstants';

// generic function
export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: ErrorUtilsDispatchType,
): void => {
  if (data.messages.length) {
    dispatch(setErrorLogAC(data.messages[ARRAY_ELEMENT_ZERO]));
  } else {
    dispatch(setErrorLogAC('Some error occurred'));
  }
  dispatch(setAppStatusAC('failed'));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType,
): void => {
  dispatch(setErrorLogAC(error.message));
  dispatch(setAppStatusAC('failed'));
};

type ErrorUtilsDispatchType = Dispatch<setErrorLogACType | setStatusACType>;
