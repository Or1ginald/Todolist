import { Dispatch } from 'redux';

import { todolistAPI, UpdateTaskRequestModel } from 'api/todolists-api';
import { ResponseCode } from 'enums';
import { setAppStatus, updateTask, updateTaskModelType, RootReducerType } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const updateTaskTC =
  (todolistId: string, taskId: string, model: updateTaskModelType) =>
  (dispatch: Dispatch, getState: () => RootReducerType) => {
    dispatch(setAppStatus('loading'));
    const state = getState();
    const task = state.tasks[todolistId].find(el => el.id === taskId);
    if (!task) {
      // throw new Error("task not found in the store");
      console.warn('task not found in the store');
      return;
    }
    const apiModel: UpdateTaskRequestModel = {
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      ...model,
    };
    todolistAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
          dispatch(updateTask({ todolistId, taskId, task: res.data.data.item }));
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
