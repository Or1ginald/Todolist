import { Dispatch } from 'redux';

import { todolistAPI } from 'api/todolists-api';
import { ResponseCode } from 'enums';
import { setAppStatus, editToDoListTitle } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const editToDoListTitleTC =
  (toDoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));
    todolistAPI
      .updateTodolist(toDoListId, title)
      .then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
          dispatch(editToDoListTitle({ todolistID: toDoListId, title }));
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
