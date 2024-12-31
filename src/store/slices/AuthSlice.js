import { loginInitialStates } from '@/src/constants/Auth/login';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
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
    login: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    },
    logout: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    },
  }
});
export default AuthSlice.reducer;
export const {
    updateMobileNumber,
    login, 
    logout
} = AuthSlice.actions;
