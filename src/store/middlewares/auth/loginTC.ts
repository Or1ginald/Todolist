import { Dispatch } from 'redux';

import { authAPI, LoginParamsType } from 'api/todolists-api';
import { ResponseCode } from 'enums';
import { setAppStatus } from 'store';
import { setIsLoggedIn } from 'store/rtkReducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  authAPI
    .login(data.email, data.password, data.rememberMe)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(setIsLoggedIn(true));
        dispatch(setAppStatus('succeeded'));
      }
      if (res.data.resultCode === ResponseCode.Failed) {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
