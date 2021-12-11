import { Dispatch } from 'redux';

import { authAPI } from '../../../api/todolists-api';

import { ResponseCode } from 'enums';
import { setAppStatusAC, setIsInitializedAC, setIsLoggedInAC } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC('succeeded'));
      }
      if (res.data.resultCode === ResponseCode.Failed) {
        dispatch(setIsLoggedInAC(false));
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};
