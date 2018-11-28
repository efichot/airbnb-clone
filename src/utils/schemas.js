import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password not long enough 6 characters at least')
    .max(50)
    .required('Required')
})
