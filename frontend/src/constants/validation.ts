import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required(),
}).required();

export const betSchema = yup.object().shape({
  amount: yup.number().min(1).positive().required(),
}).required();
