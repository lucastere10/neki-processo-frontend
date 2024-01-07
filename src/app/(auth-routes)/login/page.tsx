'use client';
import React, { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { getSession, signIn } from "next-auth/react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { login } from '@/services/auth/authService';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/loginSchema';
import { useRouter } from 'next/navigation';

const Login: FC<unknown> = () => {
  const { t, ready } = useTranslation('login');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

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
      router.replace('/profile')

    }
};


  return (
    <div className='flex'>
      <div className='flex w-1/3 bg-light-primary dark:bg-dark-primary'></div>
      <div className='flex-grow bg-white'>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  {t('SignInAccount')}
                </h1>
                <form
                  // onSubmit={handleSubmit}
                  onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                  className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="lucas@mail.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
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
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                      </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-light-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Não tem uma conta? <a onClick={() => { router.push('/register') }} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Cadastre-se</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
