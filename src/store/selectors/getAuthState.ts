import { RootStateType } from '../types';

import { authReducerInitStateType } from 'store';

export const getAuthState = (state: RootStateType): authReducerInitStateType =>
  state.auth;
