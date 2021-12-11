// import { TodolistType } from '../../api/todolists-api';

import { tasksReducerActionType, tasksType } from 'store';

const initialState: tasksType = {};

export const tasksReducer = (
  state: tasksType = initialState,
  action: tasksReducerActionType,
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
