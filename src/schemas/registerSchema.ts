
import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    nome: yup
        .string()
        .required('Digite o nome'),
    email: yup
        .string()
        .required('Digite o email'),
    senha: yup
        .string()
        .required('Digite a senha')
});