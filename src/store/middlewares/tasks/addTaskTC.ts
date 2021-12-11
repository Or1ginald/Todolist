import { Dispatch } from 'redux';

import { todolistAPI } from '../../../api/todolists-api';

import { ResponseCode } from 'enums';
import { setAppStatusAC, addTaskAC } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI
    .createTask(todolistId, title)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(addTaskAC(todolistId, res.data.data.item));
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
