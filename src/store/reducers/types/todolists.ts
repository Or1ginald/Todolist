import { TodolistType } from '../../../api/todolists-api';

import {
  addToDoListACType,
  changeTodolistEntityStatusACType,
  changeToDoListFilterACType,
  deleteToDoListACType,
  editToDoListTitleACType,
  filterType,
  setTodosACType,
} from 'store';
import { requestStatusType } from 'types';

export type todDoListsReducerActionType =
  | deleteToDoListACType
  | addToDoListACType
  | editToDoListTitleACType
  | changeToDoListFilterACType
  | setTodosACType
  | changeTodolistEntityStatusACType;

export type todDoListsType = Array<
  TodolistType & {
    filter: filterType;
    entityStatus: requestStatusType;
  }
>;
