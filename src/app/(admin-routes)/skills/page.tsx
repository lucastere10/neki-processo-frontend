'use client';
import React, { FC, useEffect, useState } from 'react';
import ProfileInfo from '@/components/ProfileInfo';
import { SkillTable } from '@/components/Table/SkillTable';
import { NewSkillModal } from '@/components/Modal/NewSkillModal';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import api from '@/services/api/api';

const Skill: FC<unknown> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [searchInput, setSearchInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [triggerEdit, setTriggerEdit] = useState(false);
  const { t, ready } = useTranslation('skills');
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleSearchSubmit();
  }, [triggerEdit]);

  const handleSearchSubmit = async () => {
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



  return (
    <>
      <div className="h-screen pt-6 flex-col dark:bg-background-dark p-16 mt-16">
        <div>
          <button onClick={openModal} className='py-2 px-4 mb-4 rounded-lg bg-light-primary text-white '>Adicionar</button>
        </div>
        <div>
          <NewSkillModal
            triggerEdit={triggerEdit}
            setTriggerEdit={setTriggerEdit}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
          <SkillTable skills={skills} setTriggerEdit={setTriggerEdit} triggerEdit={triggerEdit} />
        </div>
      </div>
    </>
  );
};

export default Skill;
