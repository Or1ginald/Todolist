import { rootStateType } from '../types';

import { appReducerInitialStateType } from 'store';

export const getAppState = (state: rootStateType): appReducerInitialStateType =>
  state.app;
