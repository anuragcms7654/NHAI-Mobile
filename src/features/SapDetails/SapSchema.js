import * as Yup from 'yup';

export const SapSchema = Yup.object({
  sapid: Yup.string()
  .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/, 'SAP ID must contain both letters and numbers')  // Allows alphabets and numbers
    .min(8, 'SAP ID must be at least 8 characters') // Minimum length of 8
    .required('SAP ID is required'), // Ensures the field is not empty
});


  export const SapInitial = {
    SapInitialValue:'',
    SapData:[],
    sapidState:true,
    sapOtpState:false
  };