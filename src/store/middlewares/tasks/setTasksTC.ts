import { Dispatch } from 'redux';

import { todolistAPI } from 'api/todolists-api';
import { setAppStatus, setTasks } from 'store';

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  todolistAPI.getTasks(todolistId).then(res => {
    dispatch(setTasks({ tasks: res.data.items, todolistId }));
    dispatch(setAppStatus('succeeded'));
  });
};
