import { Dispatch } from 'redux';

import { todolistAPI } from '../../../api/todolists-api';

import { ResponseCode } from 'enums';
import { setAppStatusAC, deleteTaskAC } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const deleteTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
          dispatch(deleteTaskAC(todolistId, taskId));
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
