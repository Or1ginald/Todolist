import { Dispatch } from 'redux';

import { todolistAPI } from 'api/todolists-api';
import { ResponseCode } from 'enums';
import { setAppStatus, deleteTask } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const deleteTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
          dispatch(deleteTask({ todolistId, taskId }));
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
