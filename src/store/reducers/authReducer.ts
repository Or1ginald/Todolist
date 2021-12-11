import { authReducerActionType, authReducerInitStateType } from 'store';

export const authReducerInitState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: authReducerInitStateType = authReducerInitState,
  action: authReducerActionType,
): authReducerInitStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN': {
      return { ...state, isLoggedIn: action.value };
    }

    default:
      return state;
  }
};
