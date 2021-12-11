import {
  addToDoListACType,
  deleteToDoListACType,
  setTodosACType,
  addTaskACType,
  deleteTaskACType,
  setTasksACType,
  updateTaskACType,
} from 'store';
import { Nullable } from 'types';

export type tasksType = {
  [key: string]: taskType[];
};

export type taskType = {
  description: Nullable<string>;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: Nullable<string>;
  deadline: Nullable<string>;
  id: string;
  todoListId: string;
  order: number;
  addedDate: Nullable<string>;
};

export type tasksReducerActionType =
  | deleteTaskACType
  | updateTaskACType
  | addTaskACType
  | addToDoListACType
  | deleteToDoListACType
  | setTodosACType
  | setTasksACType;
