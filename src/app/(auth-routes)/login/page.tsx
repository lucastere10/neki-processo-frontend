'use client';
import React, { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { getSession, signIn } from "next-auth/react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '@/services/auth/authService';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/loginSchema';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslation } from "react-i18next";
import ToggleThemeLanguage from '@/components/ToggleThemeLanguage';


const Login: FC<unknown> = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme()
  const { t, ready } = useTranslation('login');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      senha: data.senha,
      redirect: false,
    })

    if (res?.error) {
      console.log(res)
      alert('Email ou senha incorretos')
      return
    } else {
      const session = await getSession();
      const token = session?.token;
      console.log(session)
      console.log(token)
      router.replace('/')

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
        <h1 className='text-white font-bold text-2xl'>{t('Title')}</h1>
      </div>
      <div className='flex-grow bg-white'>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col w-3/6 justify-center px-6 py-8 mx-auto md:h-screen lg:pb-32">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className='flex items-center gap-4'>
                <img className='w-[90px]'
                  src={`${theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'}`}
                  alt=""
                />
                <h1 className='font-bold text-6xl'>SKILL+</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className="text-xl font-bold text-gray-900 md:text-4xl dark:text-white">{t('SignIn')}</h1>
                <ToggleThemeLanguage />
              </div>
              <form
                // onSubmit={handleSubmit}
                onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="space-y-4 md:space-y-10" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('Email')}</label>
                  {errors.email && (
                    <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                      {errors.email.message}
                    </p>
                  )}
                  <input
                    type="text"
                    {...register('email')}
                    name="email"
                    id="email"
                    // onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('Password')}</label>
                  {errors.senha && (
                    <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                      {errors.senha.message}
                    </p>
                  )}
                  <input
                    type="password"
                    {...register('senha')}
                    name="senha"
                    id="senha"
                    placeholder="••••••••"
                    // onChange={(e) => setSenha(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        value="false"
                        checked={rememberMe}
                        onChange={() => { setRememberMe(!rememberMe) }}
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">{t('RememberMe')}</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">{t('ForgotPassword')}</a>
                </div>
                <button type="submit" className="w-full text-white bg-light-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{t('SignIn')}</button>
                <p className="text-md font-light text-gray-500 dark:text-gray-400">{t('DontHaveAnAccount')}<a onClick={() => { router.push('/register') }} className="ml-2 text-md font-medium text-light-primary hover:underline dark:text-primary-500 cursor-pointer">{t('SignUp')}</a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
