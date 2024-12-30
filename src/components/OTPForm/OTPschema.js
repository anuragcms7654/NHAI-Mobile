import * as Yup from 'yup';

export const validationSchema = Yup.object({
    otp: Yup.array()
      .of(Yup.string().length(1, 'Each OTP digit must be exactly one character').required('OTP is required'))
      .length(5, 'OTP must be 5 digits long'),
  });