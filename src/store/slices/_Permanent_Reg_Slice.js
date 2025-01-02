import { createSlice } from '@reduxjs/toolkit';
import { SapInitial } from '../../features/SapDetails/SapSchema'

const initialState = {
  sap_id: SapInitial
};

export const Permanent_Reg_Slice = createSlice({
  name: 'permanent_reg',
  initialState,
  reducers: {
    updateSapId: (state, action) => {
      return {
        ...state,
        sap_id : action?.payload
      };
    },
    updateSapDetails: (state, action) => {
      return {
        ...state,
        SapData : action?.payload
      };
    }
  }
});
export default Permanent_Reg_Slice.reducer;
export const {
  updateSapId,updateSapDetails
} = Permanent_Reg_Slice.actions;
