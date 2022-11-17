import { Dispatch } from 'redux';

import { todolistAPI } from 'api/todolists-api';
import { ResponseCode } from 'enums';
import { setAppStatus, addToDoList } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  todolistAPI
    .createTodolist(title)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(addToDoList({ title, todolistID: res.data.data.item.id }));
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
