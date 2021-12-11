import { Dispatch } from 'redux';

import { todolistAPI } from '../../../api/todolists-api';
import { ResponseCode } from '../../../enums';

import { setAppStatusAC, changeTodolistEntityStatusAC, deleteToDoListAC } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const deleteToDoListTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
  dispatch(setAppStatusAC('loading'));
  todolistAPI
    .deleteTodolist(todolistId)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(deleteToDoListAC(todolistId));
        dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'));
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
