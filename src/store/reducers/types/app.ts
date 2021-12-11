import { setErrorLogACType, setIsInitializedACType, setStatusACType } from 'store';
import { Nullable, requestStatusType } from 'types';

export type appReducerInitialStateType = {
  status: requestStatusType;
  errorLog: Nullable<string>;
  isInitialized: boolean;
};

export type appReducerActionType =
  | setStatusACType
  | setErrorLogACType
  | setIsInitializedACType;
