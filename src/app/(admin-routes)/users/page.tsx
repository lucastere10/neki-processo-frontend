'use client';
import React, { FC, useEffect, useState } from 'react';
import ProfileInfo from '@/components/ProfileInfo';
import { SkillTable } from '@/components/Table/SkillTable';
import { NewSkillModal } from '@/components/Modal/NewSkillModal';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import api from '@/services/api/api';
import { ProfileCard } from '@/components/ProfileCard';

const Users: FC<unknown> = () => {
    const [skills, setSkills] = useState([]);
    const [users, setUsers] = useState<CardType[]>([]);
    const { t, ready } = useTranslation('users');

    useEffect(() => {
        getSkills();
    }, []);

    const getSkills = async () => {
        try {
            const response = await api.get(`/api/skills`);
            setSkills(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const getUsersBySkill = async (skillName: string) => {
        try {
            const response = await api.get(`/api/perfilskills/usersbyskill/${skillName}`);
            console.log(response.data)
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const handleSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        getUsersBySkill(event.target.value);
    };
    

    return (
        <>
            <div className="h-screen pt-6 flex-col dark:bg-background-dark p-16 mt-16">
                <div className='flex gap-2'>
                    <select
                        className="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-input-bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:border-primary"
                        id="skills"
                        tabIndex={0}
                        onChange={handleSkillChange}
                    >
                        <option value="">{t('chooseSkill')}</option>
                        {Object.values(skills).map((skill: skillType) => (
                            <option value={skill.skillNome} key={skill.skillNome} tabIndex={0}>
                                {skill.skillNome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='gap-4 flex flex-wrap mt-6'>
                    {users.map(user => (
                        <ProfileCard key={user.perfilSkillId} user={user} />
                    ))}
                </div>
            </div>
        </>
    )
};

export default Users;
