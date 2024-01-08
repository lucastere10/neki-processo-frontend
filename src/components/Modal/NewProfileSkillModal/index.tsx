'use client';
import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/services/api/api';
import { useTranslation } from 'react-i18next';
import { profileSkillSchema } from '@/schemas/profileSkillSchema';
import ToggleThemeLanguage from '@/components/ToggleThemeLanguage';

export const NewProfileSkillModal: FC<NewProfileSkillModalProps> = ({
    isOpen,
    onClose,
    setTriggerEdit,
    triggerEdit
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [skills, setSkills] = useState([])
    const { t, ready } = useTranslation('profile');
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: any) => {
        setSelectedValue(event.target.value);
        console.log(event.target.value);
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<profileSkillCreateType>({
        resolver: yupResolver(profileSkillSchema)
    });

    const onSubmit: SubmitHandler<profileSkillCreateType> = data => {
        newProfileSkill(data);
        reset({
            perfilSkillVersao: '',
        });
    };

    const closeModal = () => {
        reset({
            perfilSkillVersao: '',
        });
        setIsModalOpen(false);
        setIsConfirmationOpen(false);
        onClose();
    };

    useEffect(() => {
        getSkills();
    }, []);


    const getSkills = async () => {
        try {
            const response = await api.get(
                `/api/skills`
            );
            setSkills(response.data);
            console.log(response.data)
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const newProfileSkill = async (data: profileSkillCreateType) => {
        try {
            const response = await api.post('/api/perfilskills', {
                perfilSkillVersao: data.perfilSkillVersao,
                skillNome: data.skillNome,
            });
            console.log('Response data:', response.data);
            alert('HABILIDADE CADASTRADA COM SUCESSO!');
            alert(data.skillNome)
            setIsModalOpen(false);
            setTriggerEdit(!triggerEdit);
            onClose();
        } catch (err: any) {
            console.log(typeof err);
            alert(err.response.data.message);
        }
    };

    return (
        <>
            {isOpen && (
                <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                    <div
                        id="default-modal"
                        tabIndex={-1}
                        // aria-hidden="true"
                        className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
                    >
                        {/* ... (conteúdo do modal) */}
                        <div className="relative w-4/12 max-w-4xl max-h-4/5 overflow-hidden bg-light-background dark:bg-dark-background rounded-lg shadow-lg dark:bg-background-dark">
                            <div className="text-xl h-full pl-16 pr-3 py-3 mt-4 overflow-y-auto bg-light-background dark:bg-dark-background dark:bg-background-dark">
                                <div className='flex items-center justify-between mb-4' tabIndex={0} aria-label="Janela de Cadastro de Habilidades">
                                    <h1 className='font-bold'>{t('NewSkill')}</h1>
                                    <ToggleThemeLanguage />
                                </div>
                                <div>
                                    <label
                                        htmlFor="skills"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        tabIndex={0}
                                    >
                                        {t('Skill')}
                                    </label>
                                    <select
                                        {...register('skillNome')}
                                        value={selectedValue}
                                        onChange={handleChange}
                                        className="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-input-bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:border-primary"
                                        id="skills"
                                        name="skills"
                                        tabIndex={0}
                                    >
                                        {Object.values(skills).map((skill: skillType) => (
                                            <option value={skill.skillNome} key={skill.skillNome} tabIndex={0}>
                                                {skill.skillNome}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="mt-3">
                                        <div className="flex">
                                            <label
                                                htmlFor="SkillVersao"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                tabIndex={0}
                                            >
                                                {t('Version')}
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            {...register('perfilSkillVersao')}
                                            id="SkillVersao"
                                            className="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-input-bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary"
                                            placeholder={t(
                                                'Digite a Versão'
                                            )}
                                            tabIndex={0}
                                        />
                                        {errors.perfilSkillVersao && (
                                            <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                                                {errors.perfilSkillVersao.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4 mt-4 flex gap-4 justify-start">
                                    <button type='button' onClick={closeModal} className='py-2 px-4 mb-4 rounded-lg bg-light-primary text-white '>{t('Cancel')}</button>
                                    <button type='submit' className='py-2 px-4 mb-4 rounded-lg bg-light-primary text-white '>{t('Add')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};
