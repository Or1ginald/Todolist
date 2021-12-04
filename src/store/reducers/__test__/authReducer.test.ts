import { authReducer, setIsLoggedInAC } from '../authReducer';

const initialState = {
  isLoggedIn: false,
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, setIsLoggedInAC(false))).toStrictEqual(initialState);
  });
  it('should change status property', () => {
    const action = setIsLoggedInAC(true);
    expect(authReducer(initialState, action).isLoggedIn).toBe(true);
  });
});
