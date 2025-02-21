import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import type { User } from '@/models/User';

export const useAuthStore = defineStore('auth', () => {
  const { api } = useApi();
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const token = ref<string | null>(localStorage.getItem('token') || null);

  const isAuthenticated = computed(() => !!token.value);

  if (token.value) {
    api.defaults.headers.Authorization = `Bearer ${token.value}`;
  }

  const setUserAndToken = (userData: User, accessToken: string) => {
    user.value = userData;
    token.value = accessToken;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', accessToken);
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/register', { name, email, password });
      setUserAndToken(response.data, response.data.accessToken.token);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      setUserAndToken(response.data, response.data.accessToken.token);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
  };

  return { user, token, isAuthenticated, register, login, logout };
});
