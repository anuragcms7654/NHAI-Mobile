import * as Yup from 'yup';

export const validationSchema = Yup.object({
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]+$/, 'Only digits are allowed')
      .length(10, 'Mobile number must be exactly 10 digits'),
  });