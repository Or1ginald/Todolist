import { rootStateType } from '../types';

import { authReducerInitStateType } from 'store';

export const getAuthState = (state: rootStateType): authReducerInitStateType =>
  state.auth;
