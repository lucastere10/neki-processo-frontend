// import { logout } from '@/services/auth/authService';
import { signOut } from 'next-auth/react';
import React, { FC } from 'react';

const ProfileInfo: FC<ProfileInfoProps> = ({
    profileInfo
}) => {

    const handleLogout = () => {
        signOut()
    }

    return (
        <div className="flex flex-row gap-4 p-2">
            <div className='flex'>
                <img className='w-[75px] h-[75px] rounded-full' src={`https://robohash.org/${profileInfo.email}`} alt="" />
            </div>
            <div className='flex flex-col'>
                <div>
                    <h1 className='text-lg font-bold'>{profileInfo.nome}</h1>
                </div>
                <div>
                    {profileInfo.email}
                </div>
                <div className='flex gap-2 items-center'>
                    {profileInfo.perfil}
                    <button className='px-2 py-1 rounded-xl' onClick={handleLogout}>logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
