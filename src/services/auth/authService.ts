import { AxiosResponse } from 'axios';
import api from '../api/api';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export async function login(email: string, senha: string, rememberMe: boolean): Promise<LoginResponse> {
  const response: AxiosResponse<LoginResponse> = await api.post('/api/usuarios/login', { email, senha });

  // If the "Remember Me" checkbox is selected, store the token in local storage
  if (rememberMe) {
    localStorage.setItem('token', response.data.token);
  } else {
    // Otherwise, store the token in session storage
    sessionStorage.setItem('token', response.data.token);
  }

  return response.data;
}

export async function logout() {
  const router = useRouter()
  await signOut({
    redirect: false
  })
  router.replace('/')
}

// export function logout() {
//   // Remover token do local storage
//   localStorage.removeItem('token');
//   // Remover token do session storage
//   sessionStorage.removeItem('token');

//   // No need to redirect here, just return a function that does the redirect
//   return function doLogout() {
//     const router = useRouter();
//     router.push('/login');
//     alert('Sessão Finalizada');
//   }
// }