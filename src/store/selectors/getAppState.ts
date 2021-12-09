// export const getUsers = (state: RootStateType): UsersType[] => state.users. ... ;
import { AppReducerInitialStateType } from '../reducers/appReducer';
import { rootStateType } from '../types';

export const getAppState = (state: rootStateType): AppReducerInitialStateType =>
  state.app;
