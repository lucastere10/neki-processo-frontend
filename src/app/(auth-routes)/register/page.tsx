'use client';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { handleStrongPassword } from '@/utils/validates';
import { registerSchema } from '@/schemas/registerSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from 'next-themes';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useTranslation } from "react-i18next";
import ToggleThemeLanguage from '@/components/ToggleThemeLanguage';

const Register: FC<unknown> = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme, setTheme } = useTheme()
  const { t, ready } = useTranslation('register');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);



  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<usuarioCreateType>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<usuarioCreateType> = data => {
    if (password !== confirmPassword) {
      alert("Senhas não coincidem!");
    } else {
      createUser(data);
    }
  };

  const createUser = async (data: usuarioCreateType) => {
    try {
      const response = await api.post('/api/usuarios', {
        nome: data.nome,
        email: data.email,
        senha: data.senha
      });
      alert('Usuário registrado com sucesso!');
      router.push('/login')
    } catch (error) {
      console.error(error);
      alert('Um erro ocorreu ao tentar registrar o usuário');
    }
  };

  return (
    <div className='flex'>
      <div className='hidden lg:flex w-1/3 bg-light-primary dark:bg-dark-secondary justify-center pb-36 flex-col pl-12 gap-4'>
        <div className='flex items-center gap-4'>
          <img className='w-[90px]'
            src={'/images/logo-blank.png'}
            alt=""
          />
          <h1 className='text-white font-bold text-6xl'>SKILL+</h1>
        </div>
        {/* <h1 className='text-white font-bold text-5xl'>Welcome back</h1> */}
        <h1 className='text-white font-bold text-2xl'>{t('title')}</h1>
      </div>
      <div className='flex-grow bg-white'>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col w-3/6 justify-center px-6 py-8 mx-auto md:h-screen lg:pb-32">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div onClick={() => { router.push('/') }} className='cursor-pointer flex items-center gap-4'>
                <img className='w-[90px]'
                  src={`${theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'}`}
                  alt=""
                />
                <h1 className='font-bold text-6xl'>SKILL+</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className="text-xl font-bold text-gray-900 md:text-4xl dark:text-white">{t('SignUp')}</h1>
                <ToggleThemeLanguage />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('Name')}</label>
                  {errors.nome && (
                    <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                      {errors.nome.message}
                    </p>
                  )}
                  <input
                    type="name"
                    {...register('nome')}
                    placeholder='Digite seu nome'
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('Email')}</label>
                  {errors.email && (
                    <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                      {errors.email.message}
                    </p>
                  )}
                  <input
                    type="email"
                    {...register('email')}
                    placeholder='Digite seu email'
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('Password')}</label>
                  {errors.senha && (
                    <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                      {errors.senha.message}
                    </p>
                  )}
                  <div className='flex items-center relative'>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      {...register('senha')}
                      onChange={e => setPassword(e.target.value)}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                      <a className='cursor-pointer' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                        {isPasswordVisible ? <IoMdEye size={28} color='#181818' /> : <IoMdEyeOff size={28} color='#181818' />}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('ConfirmPassword')}</label>
                  <div className='flex items-center relative'>
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      onChange={e => setConfirmPassword(e.target.value)}
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                      <a className='cursor-pointer' onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                        {isConfirmPasswordVisible ? <IoMdEye size={28} color='#181818' /> : <IoMdEyeOff size={28} color='#181818' />}
                      </a>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-light-primary hover:bg-light-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{t('CreateAccount')}</button>
              </form>
              <p className="font-light text-gray-500 dark:text-gray-400">
                {t('HaveAnAccount')}<a onClick={() => { router.push('/login') }} className="ml-2 text-md font-medium text-light-primary hover:underline dark:text-primary-500 cursor-pointer">{t('SignIn')}</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
