import { authReducerInitStateType } from '../reducers/authReducer';
import { rootStateType } from '../types';

export const getAuthState = (state: rootStateType): authReducerInitStateType =>
  state.auth;
