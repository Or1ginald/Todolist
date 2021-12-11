import { appReducerInitialStateType } from './types';

import { appReducerActionType } from 'store';

export const AppReducerInitialState: appReducerInitialStateType = {
  status: 'idle',
  errorLog: null,
  isInitialized: false,
};

export const appReducer = (
  state: appReducerInitialStateType = AppReducerInitialState,
  action: appReducerActionType,
): appReducerInitialStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS': {
      return { ...state, status: action.status };
    }
    case 'APP/SET_ERROR_LOG': {
      return { ...state, errorLog: action.error };
    }
    case 'APP/SET_INITIALIZE_STATUS': {
      return { ...state, isInitialized: action.isInitialized };
    }
    default:
      return state;
  }
};
