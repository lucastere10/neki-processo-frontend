import axios from "axios";
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = session.token;
  }
  return config;
});


export default api;
