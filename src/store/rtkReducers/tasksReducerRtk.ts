import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { addToDoList, deleteToDoList, setTodos } from './todoListReducerRtk';
import { tasksType, taskType, updateTaskModelType } from './types';

const initialState: tasksType = {};

const todoListSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    deleteTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string }>,
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(el => el.id === action.payload.taskId);
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      tasks.splice(index, 1);
    },
    addTask: (state, action: PayloadAction<{ todolistId: string; task: taskType }>) => {
      state[action.payload.todolistId].unshift(action.payload.task);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        task: updateTaskModelType;
      }>,
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(el => el.id === action.payload.taskId);
      tasks[index] = { ...tasks[index], ...action.payload.task };
    },
    setTasks: (
      state,
      action: PayloadAction<{ tasks: taskType[]; todolistId: string }>,
    ) => {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: builder => {
    builder.addCase(addToDoList, (state, action) => {
      state[action.payload.todolistID] = [];
    });
    builder.addCase(deleteToDoList, (state, action) => {
      delete state[action.payload];
    });
    builder.addCase(setTodos, (state, action) => {
      action.payload.forEach(el => {
        state[el.id] = [];
      });
    });
  },
});

export const tasksReducerRtk = todoListSlice.reducer;

// Action creators are generated for each case reducer function
export const { deleteTask, addTask, updateTask, setTasks } = todoListSlice.actions;
