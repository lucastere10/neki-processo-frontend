import * as yup from 'yup';

export const profileSkillSchema = yup.object().shape({
    skillNome: yup
        .string()
        .required('Defina a habilidade'),
    perfilSkillVersao: yup
        .string()
        .required('Defina a versão da habilidade'),
});
