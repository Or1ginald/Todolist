import { Dispatch } from 'redux';

import { todolistAPI } from 'api/todolists-api';
import { ResponseCode } from 'enums';
import { setAppStatus, addTask } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  todolistAPI
    .createTask(todolistId, title)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(addTask({ todolistId, task: res.data.data.item }));
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
