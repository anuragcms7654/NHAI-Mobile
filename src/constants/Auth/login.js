import * as Yup from 'yup';

export const loginSchema = Yup.object({
    mobileNumber: Yup.string().matches(/^[789]\d{9}$/, 'Invalid Indian mobile number').length(10, 'Mobile number must be 10 digits').required('Mobile number is required'),
})