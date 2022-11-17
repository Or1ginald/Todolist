import { Dispatch } from 'redux';

import { todolistAPI } from 'api/todolists-api';
import { ResponseCode } from 'enums';
import { changeTodolistEntityStatus, deleteToDoList, setAppStatus } from 'store';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const deleteToDoListTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(
    changeTodolistEntityStatus({
      todolistID: todolistId,
      entityStatus: 'loading',
    }),
  );
  dispatch(setAppStatus('loading'));
  todolistAPI
    .deleteTodolist(todolistId)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(deleteToDoList(todolistId));
      }
      if (res.data.resultCode === ResponseCode.Failed) {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppStatus('succeeded'));
    });
};
