import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type authReducerInitStateType = {
  isLoggedIn: boolean;
};

const initialState: authReducerInitStateType = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authReducerRtk = authSlice.reducer;

// Action creators are generated for each case reducer function
export const { setIsLoggedIn } = authSlice.actions;
