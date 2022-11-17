import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {
  appReducerRtk,
  authReducerRtk,
  tasksReducerRtk,
  todoListReducerRtk,
} from './rtkReducers';

// ...
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const rootReducer = combineReducers({
  tasks: tasksReducerRtk,
  toDoLists: todoListReducerRtk,
  app: appReducerRtk,
  auth: authReducerRtk,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

// @ts-ignore
window.store = store;
