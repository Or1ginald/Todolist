import { Dispatch } from 'redux';

import { authAPI } from '../../../api/todolists-api';

import { ResponseCode } from 'enums';
import { setAppStatusAC, setIsLoggedInAC, setTodosAC } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  authAPI
    .logOut()
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setTodosAC([]));
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
