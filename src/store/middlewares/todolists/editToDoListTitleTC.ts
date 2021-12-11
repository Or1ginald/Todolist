import { Dispatch } from 'redux';

import { todolistAPI } from '../../../api/todolists-api';

import { ResponseCode } from 'enums';
import { setAppStatusAC, editToDoListTitleAC } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const editToDoListTitleTC =
  (toDoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI
      .updateTodolist(toDoListId, title)
      .then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
          dispatch(editToDoListTitleAC(toDoListId, title));
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
