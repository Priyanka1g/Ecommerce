// slices/signupSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    userName: '',
    userEmail: '',
    userPassword: '',
  },
  reducers: {
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      state.userName = name;
      state.userEmail = email;
      state.userPassword = password;
    },
  },
});

export const { signup } = signupSlice.actions;
export const selectSignupInfo = (state) => state.signup;
export default signupSlice.reducer;
