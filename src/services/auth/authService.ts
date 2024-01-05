import { AxiosResponse } from 'axios';
import api from '../api/api';

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
