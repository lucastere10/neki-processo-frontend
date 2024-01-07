'use client';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { handleStrongPassword } from '@/utils/validates';
import { registerSchema } from '@/schemas/registerSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const Register: FC<unknown> = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<usuarioCreateType>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<usuarioCreateType> = data => {
    console.log('teste')
    if (password !== confirmPassword) {
      alert("Senhas não coincidem!");
    } else {
      console.log(data)
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
      console.log(response.data);
      alert('Usuário registrado com sucesso!');
      router.push('/login')
    } catch (error) {
      console.error(error);
      alert('Um erro ocorreu ao tentar registrar o usuário');
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
                  Create and account
                </h1>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
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
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    {errors.senha && (
                      <p className="text-red-500 text-sm mb-1" tabIndex={0}>
                        {errors.senha.message}
                      </p>
                    )}
                    <input
                      type="password"
                      {...register('senha')}
                      onChange={e => setPassword(e.target.value)}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input
                      type="password"
                      onChange={e => setConfirmPassword(e.target.value)}
                      id="confirm-password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <button type="submit" className="w-full text-white bg-light-primary hover:bg-light-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                </form>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Já tem uma conta? <a onClick={() => {router.push('/login') }} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Iniciar Sessão</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;