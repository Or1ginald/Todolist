import { TodolistType } from '../../api/todolists-api';

import { filterType } from 'store';
import { requestStatusType } from 'types';

export const deleteToDoListAC = (toDoListId: string) =>
  ({
    type: 'TO-DO_LISTS/DELETE-TODOLIST',
    toDoListId,
  } as const);
export const addToDoListAC = (title: string, todolistID: string) =>
  ({
    type: 'TO-DO_LISTS/ADD-TODOLIST',
    title,
    todolistID,
  } as const);
export const editToDoListTitleAC = (toDoListId: string, title: string) =>
  ({
    type: 'TO-DO_LISTS/EDIT-TODOLIST-TITLE',
    title,
    toDoListId,
  } as const);
export const changeToDoListFilterAC = (toDoListId: string, filter: filterType) =>
  ({
    type: 'TO-DO_LISTS/CHANGE-FILTER',
    toDoListId,
    filter,
  } as const);

export const setTodosAC = (todos: Array<TodolistType>) =>
  ({
    type: 'TO-DO_LISTS/SET_TODOS',
    todos,
  } as const);
export const changeTodolistEntityStatusAC = (
  toDoListId: string,
  entityStatus: requestStatusType,
) =>
  ({
    type: 'TO-DO_LISTS/CHANGE_TODOLIST_ENTITY_STATUS',
    entityStatus,
    toDoListId,
  } as const);
