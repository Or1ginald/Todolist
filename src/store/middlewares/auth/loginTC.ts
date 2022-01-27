import { Dispatch } from 'redux';

import { authAPI, LoginParamsType } from '../../../api/todolists-api';

import { ResponseCode } from 'enums';
import { setAppStatusAC, setIsLoggedInAC } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  authAPI
    .login(data.email, data.password, data.rememberMe)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC('succeeded'));
      }
      if (res.data.resultCode === ResponseCode.Failed) {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
