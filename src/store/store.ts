import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer, authReducer, tasksReducer, todDoListsReducer } from 'store';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  toDoLists: todDoListsReducer,
  app: appReducer,
  auth: authReducer,
});

// export const store = createStore(rootReducer, applyMiddleware(thunk));

const composeEnhancers =
  // @ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

// @ts-ignore
window.store = store;
