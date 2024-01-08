'use client';
import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/services/api/api';
import { useTranslation } from 'react-i18next';
import { skillSchema } from '@/schemas/skillSchema';
import ToggleThemeLanguage from '@/components/ToggleThemeLanguage';


export const NewSkillModal: FC<NewSkillModalProps> = ({
    isOpen,
    onClose,
    setTriggerEdit,
    triggerEdit
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const { t, ready } = useTranslation('skill');

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<skillCreateType>({
        resolver: yupResolver(skillSchema)
    });

    const onSubmit: SubmitHandler<skillCreateType> = data => {
        newSkill(data);
        reset({
            skillNome: '',
            skillDescricao: '',
            skillUrl: '',
        });
    };

    const closeModal = () => {
        reset({
            skillNome: '',
            skillDescricao: '',
            skillUrl: '',
        });
        setIsModalOpen(false);
        setIsConfirmationOpen(false);
        onClose();
    };

    const newSkill = async (data: skillCreateType) => {
        try {
            const response = await api.post('/api/skills', {
                skillNome: data.skillNome,
                skillDescricao: data.skillDescricao,
                skillUrl: data.skillUrl,
            });
            console.log('Response data:', response.data);
            alert('Habilidade Cadastrada com sucesso!');
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
                            <div className=" text-xl h-full pl-16 pr-3 py-3 mt-4 overflow-y-auto bg-light-background dark:bg-dark-background">
                            <div className='flex items-center justify-between mb-4' tabIndex={0} aria-label="Janela de Cadastro de Habilidades">
                                <h1 className='font-bold'>{t('NewSkill')}</h1>
                                <ToggleThemeLanguage />
                            </div>
                                <div>
                                    <div className="mt-3">
                                        <div className="flex">
                                            <label
                                                htmlFor="skillNome"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                tabIndex={0}
                                            >
                                                {t('Name')}
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            {...register('skillNome')}
                                            id="skillNome"
                                            className="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-input-bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary"
                                            placeholder={t(
                                                'Enter the name of the event to be registered'
                                            )}
                                            tabIndex={0}
                                        />
                                        {errors.skillNome && (
                                            <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                                                {errors.skillNome.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex">
                                            <label
                                                htmlFor="SkillVersao"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                tabIndex={0}
                                            >
                                                {t('Description')}
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            {...register('skillDescricao')}
                                            id="SkillVersao"
                                            className="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-input-bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary"
                                            placeholder={t(
                                                'Enter the name of the event to be registered'
                                            )}
                                            tabIndex={0}
                                        />
                                        {errors.skillDescricao && (
                                            <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                                                {errors.skillDescricao.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex">
                                            <label
                                                htmlFor="SkillVersao"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                tabIndex={0}
                                            >
                                                {t('Image')}
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            {...register('skillUrl')}
                                            id="SkillVersao"
                                            className="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-input-bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary"
                                            placeholder={t(
                                                'Enter the name of the event to be registered'
                                            )}
                                            tabIndex={0}
                                        />
                                        {errors.skillUrl && (
                                            <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                                                {errors.skillUrl.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4 mt-4 flex gap-4 justify-end">
                                    <button type='button' onClick={closeModal} className='py-2 px-4 mb-4 rounded-lg bg-light-primary text-white '>{t('Cancel')}</button>
                                    <button type='submit' className='py-2 px-4 mb-4 rounded-lg bg-light-primary text-white '>{t('NewSkill')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};
