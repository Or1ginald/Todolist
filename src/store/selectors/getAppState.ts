import { RootStateType } from '../types';

import { appReducerInitialStateType } from 'store';

export const getAppState = (state: RootStateType): appReducerInitialStateType =>
  state.app;
