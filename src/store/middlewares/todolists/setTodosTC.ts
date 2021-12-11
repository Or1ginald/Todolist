import { Dispatch } from 'redux';

import { todolistAPI } from '../../../api/todolists-api';

import { setAppStatusAC, setTodosAC } from 'store';
import { handleServerNetworkError } from 'utils';

export const setTodosTC = (dispatch: Dispatch): void => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI
    .getTodolists()
    .then(res => {
      dispatch(setTodosAC(res.data));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
