import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enquiryStatus: '',
};

export const EnquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    resetAddEnquiry: (state, action) => {
      return {
        ...state,
        enquiryStatus : "yesss"
      };
    },
  }
});
export default EnquirySlice.reducer;
export const {
  resetAddEnquiry,
} = EnquirySlice.actions;
