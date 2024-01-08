// import { logout } from '@/services/auth/authService';
import { signOut } from 'next-auth/react';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCheck, MdClose, MdDelete } from 'react-icons/md';

const ProfileInfo: FC<ProfileInfoProps> = ({
    profileInfo
}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const { t, ready } = useTranslation('profile');

    const handleLogout = () => {
        signOut()
    }

    return (
        <div className="shadow-xl w-fit flex flex-row gap-4 py-6 pr-16 pl-10 items-center border-2 rounded-lg ">
            <div className='flex'>
                <img className='w-[150px] h-[150px] border-2 rounded-full' src={`https://robohash.org/${profileInfo.email}`} alt="" />
            </div>
            {(isEditOpen ?
                (<>
                    <div className='flex flex-col'>
                        <div className='flex items-center mb-2 gap-4'>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                placeholder={profileInfo.nome}
                                defaultValue={profileInfo.nome}
                            />
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="rounded-full p-2 bg-light-rose-500 hover:bg-red-700"
                                type="button"
                                tabIndex={0}
                                aria-label="Botão de cancelar ação"
                            >
                                <MdClose color="white" size={20} />
                            </button>
                            <form id="editForm" onSubmit={() => { }}>
                                <button
                                    className="rounded-full p-2 bg-light-green-500 hover:bg-green-700"
                                    type="submit"
                                    tabIndex={0}
                                    aria-label="Botão de confirmar edição"
                                >
                                    <MdCheck color="white" size={20} />
                                </button>
                            </form>
                        </div>
                        <div className='flex'>
                            <div className='flex flex-col mr-4 gap-2'>
                                <p className='font-bold'>{t('Email')}: </p>
                                <p className='font-bold'>{t('Phone')}: </p>
                                <p className='font-bold'>{t('Adress')}: </p>
                                <p className='font-bold'>{t('Profile')}: </p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        placeholder={profileInfo.email}
                                        defaultValue={profileInfo.email}
                                    />
                                </div>
                                <div>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        placeholder={profileInfo.telefone}
                                        defaultValue={profileInfo.telefone}
                                    />
                                </div>
                                <div>
                                    Rua das Flores, 123
                                </div>
                                <div className='flex gap-2 items-center'>
                                    {profileInfo.perfil}
                                </div>
                            </div>
                        </div>
                    </div>
                </>) :
                (<>
                    <div className='flex flex-col'>
                        <div className='flex items-center mb-2 gap-4'>
                            <h1 className='text-2xl font-bold'>{profileInfo.nome}</h1>
                            <button
                                className='px-1.5 py-1 text-white rounded-md bg-light-primary hover:bg-light-secondary dark:hover:bg-dark-secondary dark:bg-dark-primary'
                                onClick={() => { setIsEditOpen(true) }}
                            >
                                {t('Edit')}
                            </button>
                        </div>
                        <div className='flex'>
                            <div className='flex flex-col mr-4 gap-2'>
                                <p className='font-bold'>{t('Email')}: </p>
                                <p className='font-bold'>{t('Phone')}: </p>
                                <p className='font-bold'>{t('Adress')}: </p>
                                <p className='font-bold'>{t('Profile')}: </p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div>
                                    {profileInfo.email}
                                </div>
                                <div>
                                    {profileInfo.telefone}
                                </div>
                                <div>
                                    Rua das Flores, 123
                                </div>
                                <div className='flex gap-2 items-center'>
                                    {profileInfo.perfil}
                                </div>
                            </div>
                        </div>
                    </div>
                </>))}
        </div>
    );
};

export default ProfileInfo;
