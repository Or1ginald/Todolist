import { Dispatch } from 'redux';

import { todolistAPI } from '../../../api/todolists-api';

import { ResponseCode } from 'enums';
import { setAppStatusAC, addToDoListAC } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI
    .createTodolist(title)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(addToDoListAC(title, res.data.data.item.id));
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
