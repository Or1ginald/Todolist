import { Dispatch } from 'redux';

import { authAPI } from '../../../api/todolists-api';

import { ResponseCode } from 'enums';
import { setAppStatus, setIsInitialized } from 'store';
import { setIsLoggedIn } from 'store/rtkReducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(setIsLoggedIn(true));
        dispatch(setAppStatus('succeeded'));
      }
      if (res.data.resultCode === ResponseCode.Failed) {
        dispatch(setIsLoggedIn(false));
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitialized(true));
    });
};
