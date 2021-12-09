import {
  appReducer,
  AppReducerInitialStateType,
  setAppStatusAC,
  setErrorLogAC,
  setIsInitializedAC,
} from '../appReducer';

const initialState: AppReducerInitialStateType = {
  status: 'idle',
  errorLog: null,
  isInitialized: false,
};

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, setAppStatusAC('idle'))).toStrictEqual(initialState);
  });
  it('should change status property', () => {
    const action = setAppStatusAC('succeeded');
    expect(appReducer(initialState, action).status).toBe('succeeded');
  });
  it('should change errorLog property', () => {
    expect(appReducer(initialState, setErrorLogAC('New error')).errorLog).toBe(
      'New error',
    );
    expect(appReducer(initialState, setErrorLogAC(null)).errorLog).toBe(null);
  });
  it('should change isInitialized property', () => {
    expect(appReducer(initialState, setIsInitializedAC(true)).isInitialized).toBe(true);
    expect(appReducer(initialState, setIsInitializedAC(true)).isInitialized).not.toBe(
      false,
    );
  });
});
