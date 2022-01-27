import { rootReducer, store } from './store';

export type RootStateType = ReturnType<typeof store.getState>;
export type RootReducerType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
