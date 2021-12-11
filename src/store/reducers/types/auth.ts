import { authReducerInitState } from '../authReducer';

import { setIsLoggedInACType } from 'store';

export type authReducerInitStateType = typeof authReducerInitState;
export type authReducerActionType = setIsLoggedInACType;
