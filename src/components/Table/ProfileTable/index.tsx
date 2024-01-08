import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileTableRow } from './ProfileTableRow';

export const ProfileTable: FC<ProfileTableProps> = ({
  profileSkills,
  setTriggerEdit,
  triggerEdit,
}) => {
  const { t, ready } = useTranslation('profile');

  // if (!ready) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-100">
        <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-stone-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 w-1/6 cursor-pointer"
              tabIndex={0}
            >
              {t('Name')}
            </th>
            <th
              scope="col"
              className="px-6 py-3 w-3/6 cursor-pointer"
              tabIndex={0}
            >
              {t('Description')}
            </th>
            <th scope="col" className="px-6 py-3" tabIndex={0}>
              {t('Version')}
            </th>
            <th scope="col" className="px-6 py-3" tabIndex={0}>
              {t('Image')}
            </th>
            <th scope="col" className="px-6 py-3" tabIndex={0}>
              {t('Edit')}
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(Object.values(profileSkills)) &&
            Object.values(profileSkills).map((profileSkill: profileSkillType) => (
              <ProfileTableRow
                profileSkill={profileSkill}
                setTriggerEdit={setTriggerEdit}
                triggerEdit={triggerEdit}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
