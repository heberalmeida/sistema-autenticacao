import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from '@/composables/useApi';
import type { User } from '@/models/User';

export const useUserStore = defineStore('user', () => {
  const { api } = useApi();
  const users = ref<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      users.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  return { users, fetchUsers };
});
