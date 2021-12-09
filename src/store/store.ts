import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer, authReducer, tasksReducer, todDoListsReducer } from 'store';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  toDoLists: todDoListsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
