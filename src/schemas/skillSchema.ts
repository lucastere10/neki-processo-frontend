
import * as yup from 'yup';

export const skillSchema = yup.object().shape({
    skillNome: yup
        .string()
        .required('Todos os campos obrigatórios devem ser preenchidos!'),
});