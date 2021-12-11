import { requestStatusType, Nullable } from 'types';

export const setAppStatusAC = (status: requestStatusType) =>
  ({
    type: 'APP/SET_STATUS',
    status,
  } as const);
export const setErrorLogAC = (error: Nullable<string>) =>
  ({
    type: 'APP/SET_ERROR_LOG',
    error,
  } as const);

export const setIsInitializedAC = (isInitialized: boolean) =>
  ({
    type: 'APP/SET_INITIALIZE_STATUS',
    isInitialized,
  } as const);
