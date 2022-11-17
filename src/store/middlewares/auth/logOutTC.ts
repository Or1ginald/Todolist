import { Dispatch } from 'redux';

import { authAPI } from 'api/todolists-api';
import { ResponseCode } from 'enums';
import { setAppStatus, setTodos } from 'store';
import { setIsLoggedIn } from 'store/rtkReducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  authAPI
    .logOut()
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(setIsLoggedIn(false));
        dispatch(setTodos([]));
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
