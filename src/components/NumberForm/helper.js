import * as Yup from 'yup';

export const initialValues = {
  mobileNumber: '',
}

export const validationSchema = Yup.object({
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]+$/, 'Only digits are allowed')  
      .length(10, 'Mobile number must be exactly 10 digits') 
      .test('starts-with-5', 'Mobile number must start with a digit 6 or above', value => {
        return value && parseInt(value[0]) >= 6;
      }),
});
