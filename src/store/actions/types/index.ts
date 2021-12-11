import {
  addTaskAC,
  addToDoListAC,
  changeTodolistEntityStatusAC,
  changeToDoListFilterAC,
  deleteTaskAC,
  deleteToDoListAC,
  editToDoListTitleAC,
  setAppStatusAC,
  setErrorLogAC,
  setIsInitializedAC,
  setIsLoggedInAC,
  setTasksAC,
  setTodosAC,
  updateTaskAC,
} from 'store';
import { Nullable } from 'types';

export type setStatusACType = ReturnType<typeof setAppStatusAC>;
export type setErrorLogACType = ReturnType<typeof setErrorLogAC>;
export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>;

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>;

export type deleteTaskACType = ReturnType<typeof deleteTaskAC>;
export type updateTaskACType = ReturnType<typeof updateTaskAC>;
export type addTaskACType = ReturnType<typeof addTaskAC>;
export type setTasksACType = ReturnType<typeof setTasksAC>;

export type deleteToDoListACType = ReturnType<typeof deleteToDoListAC>;
export type addToDoListACType = ReturnType<typeof addToDoListAC>;
export type editToDoListTitleACType = ReturnType<typeof editToDoListTitleAC>;
export type changeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>;
export type setTodosACType = ReturnType<typeof setTodosAC>;
export type changeTodolistEntityStatusACType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;

export type filterType = 'All' | 'Active' | 'Completed';

export type updateTaskModelType = {
  title?: string;
  description?: Nullable<string>;
  status?: number;
  priority?: number;
  startDate?: Nullable<string>;
  deadline?: Nullable<string>;
};
