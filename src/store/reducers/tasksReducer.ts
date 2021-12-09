import { Dispatch } from 'redux';

import { todolistAPI, updateTaskRequestModel } from '../../api/todolists-api';
import { rootReducerType } from '../types';

import { setAppStatusAC } from './appReducer';
import {
  addToDoListACType,
  deleteToDoListACType,
  setTodosACType,
} from './todolistsReducer';

import { ResponseCode } from 'enums';
import { Nullable } from 'types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

/* ------------types---------------*/
type mainActionType =
  | deleteTaskACType
  | updateTaskACType
  | addTaskACType
  | addToDoListACType
  | deleteToDoListACType
  | setTodosACType
  | setTasksACType;

type deleteTaskACType = ReturnType<typeof deleteTaskAC>;
type updateTaskACType = ReturnType<typeof updateTaskAC>;
type addTaskACType = ReturnType<typeof addTaskAC>;
type setTasksACType = ReturnType<typeof setTasksAC>;

/* ------------types---------------*/

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

export type updateTaskModelType = {
  title?: string;
  description?: Nullable<string>;
  status?: number;
  priority?: number;
  startDate?: Nullable<string>;
  deadline?: Nullable<string>;
};

const initialState: tasksType = {
  // [ToDoListId1]: [
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ],
  // [ToDoListId2]: [
  //     {id: v1(), title: "HTML&CSS2", isDone: true},
  //     {id: v1(), title: "JS2", isDone: true},
  //     {id: v1(), title: "ReactJS2", isDone: false},
  //     {id: v1(), title: "Rest API2", isDone: false},
  //     {id: v1(), title: "GraphQL2", isDone: false},
  // ]
};

export const tasksReducer = (
  state: tasksType = initialState,
  action: mainActionType,
): tasksType => {
  switch (action.type) {
    case 'TO-DO_LISTS/SET_TODOS': {
      // action.todos.forEach(el=>{
      //     return {...store, [el.id]: []}
      // })
      const copyState = { ...state };
      action.todos.forEach(el => {
        copyState[el.id] = [];
      });
      return copyState;
    }
    case 'TASKS/DELETE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(e => e.id !== action.taskId),
      };
    }
    case 'TASKS/UPDATE_TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(e =>
          e.id === action.taskId ? { ...e, ...action.task } : e,
        ),
      };
    }
    case 'TASKS/SET_TASKS': {
      return { ...state, [action.todolistId]: action.tasks };
    }
    case 'TASKS/ADD-TASK': {
      return {
        ...state,
        [action.todolistId]: [action.task, ...state[action.todolistId]],
      };
    }
    case 'TO-DO_LISTS/ADD-TODOLIST': {
      return { ...state, [action.todolistID]: [] };
    }
    case 'TO-DO_LISTS/DELETE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.toDoListId];
      return copyState;
    }

    default: {
      return state;
    }
  }
};

/* ------------Action Creators---------------*/
export const deleteTaskAC = (todolistId: string, taskId: string) =>
  ({
    type: 'TASKS/DELETE-TASK',
    todolistId,
    taskId,
  } as const);
export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  task: updateTaskModelType,
) =>
  ({
    type: 'TASKS/UPDATE_TASK',
    todolistId,
    taskId,
    task,
  } as const);

export const addTaskAC = (todolistId: string, task: taskType) =>
  ({
    type: 'TASKS/ADD-TASK',
    todolistId,
    task,
  } as const);
export const setTasksAC = (tasks: Array<taskType>, todolistId: string) =>
  ({
    type: 'TASKS/SET_TASKS',
    tasks,
    todolistId,
  } as const);
/* ------------Action Creators---------------*/
// thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI.getTasks(todolistId).then(res => {
    dispatch(setTasksAC(res.data.items, todolistId));
    dispatch(setAppStatusAC('succeeded'));
  });
};
export const deleteTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
          dispatch(deleteTaskAC(todolistId, taskId));
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
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI
    .createTask(todolistId, title)
    .then(res => {
      if (res.data.resultCode === ResponseCode.Success) {
        dispatch(addTaskAC(todolistId, res.data.data.item));
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
export const updateTaskTC =
  (todolistId: string, taskId: string, model: updateTaskModelType) =>
  (dispatch: Dispatch, getState: () => rootReducerType) => {
    dispatch(setAppStatusAC('loading'));
    const state = getState();
    const task = state.tasks[todolistId].find(el => el.id === taskId);
    if (!task) {
      // throw new Error("task not found in the store");
      console.warn('task not found in the store');
      return;
    }
    const apiModel: updateTaskRequestModel = {
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
          dispatch(updateTaskAC(todolistId, taskId, res.data.data.item));
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
