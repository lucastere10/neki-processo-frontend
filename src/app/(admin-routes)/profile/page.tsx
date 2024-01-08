'use client';
import React, { FC, useEffect, useState } from 'react';
import ProfileInfo from '@/components/ProfileInfo';
import { ProfileTable } from '@/components/Table/ProfileTable';
import { NewProfileSkillModal } from '@/components/Modal/NewProfileSkillModal';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import api from '@/services/api/api';
import { getSession, signOut } from 'next-auth/react';

const Profile: FC<unknown> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [searchInput, setSearchInput] = useState('');
  const [profileSkills, setProfileSkills] = useState([]);
  const [profile, setProfile] = useState<usuarioType>({
    nome: '',
    telefone: '',
    email: '',
    perfil: '',
    dataCadastro: '',
  });
  const [triggerEdit, setTriggerEdit] = useState(false);
  const { t, ready } = useTranslation('profile');
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleSearchSubmit();
    getProfileInfo();
  }, [triggerEdit]);

  const handleSearchSubmit = async () => {
    try {
      const response = await api.get(
        `/api/perfilskills/user`
      );
      setProfileSkills(response.data);
      console.log(response.data)
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const getProfileInfo = async () => {
    try {
      const response = await api.get(
        `/api/usuarios/public`
      );
      setProfile(response.data);
      console.log(response.data)
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const getToken = async () => {
    const session = await getSession();
    const token = session?.token;
    console.log(session?.token)
    console.log(session?.usuario)
  }

  return (
    <>
      <div className="h-screen pt-6 flex-col dark:bg-background-dark p-16 mt-4">
        
        <div className='mb-10'>
          <ProfileInfo profileInfo={profile} />
        </div>
        <div>
          <button onClick={openModal} className='py-2 px-4 mb-4 rounded-lg bg-light-primary text-white '>{t('Add')}</button>
        </div>
        <div>
          <NewProfileSkillModal
            triggerEdit={triggerEdit}
            setTriggerEdit={setTriggerEdit}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
          <ProfileTable profileSkills={profileSkills} setTriggerEdit={setTriggerEdit} triggerEdit={triggerEdit} />
        </div>
      </div>
    </>
  );
};

export default Profile;
