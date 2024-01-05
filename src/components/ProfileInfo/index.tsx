import React, { FC } from 'react';

const ProfileInfo: FC<ProfileInfoProps> = ({
    profileInfo
}) => {

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
                <div>
                    {profileInfo.perfil}
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
