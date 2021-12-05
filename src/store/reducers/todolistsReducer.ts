import { Dispatch } from 'redux';

import { todolistAPI, TodolistType } from '../../api/todolists-api';

import { requestStatusType, setAppStatusAC } from './appReducer';

import { ResponseCode } from 'enums';
import { handleServerAppError, handleServerNetworkError } from 'utils';

/* -------------types----------------*/
export type ToDoListsType = TodolistType & {
  filter: filterType;
  entityStatus: requestStatusType;
};

export type filterType = 'All' | 'Active' | 'Completed';

type mainActionType =
  | deleteToDoListACType
  | addToDoListACType
  | editToDoListTitleACType
  | changeToDoListFilterACType
  | setTodosACType
  | changeTodolistEntityStatusACType;

export type deleteToDoListACType = ReturnType<typeof deleteToDoListAC>;
export type addToDoListACType = ReturnType<typeof addToDoListAC>;
type editToDoListTitleACType = ReturnType<typeof editToDoListTitleAC>;
type changeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>;
export type setTodosACType = ReturnType<typeof setTodosAC>;
export type changeTodolistEntityStatusACType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;
/* -------------types----------------*/

const initialState: Array<ToDoListsType> = [];

export const todDoListsReducer = (
  state: Array<ToDoListsType> = initialState,
  action: mainActionType,
): Array<ToDoListsType> => {
  switch (action.type) {
    case 'TO-DO_LISTS/DELETE-TODOLIST': {
      return state.filter(el => el.id !== action.toDoListId);
    }
    case 'TO-DO_LISTS/ADD-TODOLIST': {
      return [
        {
          id: action.todolistID,
          title: action.title,
          filter: 'All',
          order: 0,
          addedDate: '',
          entityStatus: 'idle',
        },
        ...state,
      ];
    }
    case 'TO-DO_LISTS/EDIT-TODOLIST-TITLE': {
      return state.map(el =>
        el.id === action.toDoListId ? { ...el, title: action.title } : el,
      );
    }
    case 'TO-DO_LISTS/CHANGE-FILTER': {
      return state.map(el =>
        el.id === action.toDoListId ? { ...el, filter: action.filter } : el,
      );
    }
    case 'TO-DO_LISTS/SET_TODOS': {
      return action.todos.map(el => ({ ...el, filter: 'All', entityStatus: 'idle' }));
    }
    case 'TO-DO_LISTS/CHANGE_TODOLIST_ENTITY_STATUS': {
      return state.map(el =>
        el.id === action.toDoListId ? { ...el, entityStatus: action.entityStatus } : el,
      );
    }
    default: {
      return state;
    }
  }
};

/* -------------Action Creators----------------*/
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
/* -------------Action Creators----------------*/
/* -------------Thunk Creators----------------*/

export const setTodosTC = (dispatch: Dispatch): void => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI
    .getTodolists()
    .then(res => {
      dispatch(setTodosAC(res.data));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
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
export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI
    .createTodolist(title)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(addToDoListAC(title, res.data.data.item.id));
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
export const editToDoListTitleTC =
  (toDoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI
      .updateTodolist(toDoListId, title)
      .then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
          dispatch(editToDoListTitleAC(toDoListId, title));
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

/* -------------Thunk Creators----------------*/
