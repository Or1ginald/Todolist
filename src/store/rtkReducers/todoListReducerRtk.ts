import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { filterType, todDoListsType } from './types';

import { TodolistType } from 'api/todolists-api';
import { requestStatusType } from 'types';

const initialState: todDoListsType = [];

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    deleteToDoList: (state, action: PayloadAction<string>) =>
      state.filter(el => el.id !== action.payload),
    addToDoList: (
      state,
      action: PayloadAction<{ title: string; todolistID: string }>,
    ) => {
      state.unshift({
        id: action.payload.todolistID,
        title: action.payload.title,
        filter: 'All',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      });
    },
    editToDoListTitle: (
      state,
      action: PayloadAction<{ title: string; todolistID: string }>,
    ) => {
      const itemIndex = state.findIndex(el => el.id === action.payload.todolistID);
      state[itemIndex].title = action.payload.title;
    },
    changeToDoListFilter: (
      state,
      action: PayloadAction<{ filter: filterType; todolistID: string }>,
    ) => {
      const itemIndex = state.findIndex(el => el.id === action.payload.todolistID);
      state[itemIndex].title = action.payload.filter;
    },
    setTodos: (state, action: PayloadAction<TodolistType[]>) =>
      action.payload.map(el => ({
        ...el,
        filter: 'All',
        entityStatus: 'idle',
      })),
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ todolistID: string; entityStatus: requestStatusType }>,
    ) => {
      const itemIndex = state.findIndex(el => el.id === action.payload.todolistID);
      state[itemIndex].entityStatus = action.payload.entityStatus;
    },
  },
});

export const todoListReducerRtk = todoListSlice.reducer;

// Action creators are generated for each case reducer function
export const {
  deleteToDoList,
  changeTodolistEntityStatus,
  changeToDoListFilter,
  addToDoList,
  editToDoListTitle,
  setTodos,
} = todoListSlice.actions;
