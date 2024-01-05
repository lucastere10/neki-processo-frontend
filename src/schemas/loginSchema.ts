
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Digite o email'),
    senha: yup
        .string()
        .required('Digite a senha'),
});