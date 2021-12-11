import { Dispatch } from 'redux';

import { todolistAPI } from '../../../api/todolists-api';

import { setAppStatusAC, setTasksAC } from 'store';

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI.getTasks(todolistId).then(res => {
    dispatch(setTasksAC(res.data.items, todolistId));
    dispatch(setAppStatusAC('succeeded'));
  });
};
