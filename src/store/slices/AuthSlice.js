import { loginInitialStates } from '@/src/constants/Auth/login';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileNumber: ""
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateMobileNumber: (state, action) => {
      return {
        ...state,
        mobileNumber : action?.payload
      };
    },
    uMobileNumber: (state, action) => {
      return {
        ...state,
        mobileNumber : action?.payload
      };
    },
  }
});
export default AuthSlice.reducer;
export const {
    updateMobileNumber,
} = AuthSlice.actions;
