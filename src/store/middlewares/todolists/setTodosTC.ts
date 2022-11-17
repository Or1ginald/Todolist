import { Dispatch } from 'redux';

import { todolistAPI } from 'api/todolists-api';
import { setAppStatus, setTodos } from 'store';
import { handleServerNetworkError } from 'utils';

export const setTodosTC = (dispatch: Dispatch): void => {
  dispatch(setAppStatus('loading'));
  todolistAPI
    .getTodolists()
    .then(res => {
      dispatch(setTodos(res.data));
      dispatch(setAppStatus('succeeded'));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
