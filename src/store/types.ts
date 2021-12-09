import { rootReducer, store } from './store';

export type rootStateType = ReturnType<typeof store.getState>;
export type rootReducerType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
