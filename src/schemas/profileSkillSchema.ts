import * as yup from 'yup';

export const profileSkillSchema = yup.object().shape({
    perfilSkillVersao: yup
        .string()
        .required('Todos os campos obrigatórios devem ser preenchidos!'),
});