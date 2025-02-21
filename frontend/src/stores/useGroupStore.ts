import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from '@/composables/useApi';
import type { Group } from '@/models/Group';

export const useGroupStore = defineStore('groupStore', () => {
  const { api } = useApi();
  const groups = ref<Group[]>([]);

  const fetchGroups = async () => {
    try {
      const response = await api.get('/groups');
      groups.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar grupos:', error);
    }
  };

  const createGroup = async (name: string) => {
    try {
      await api.post('/groups', { name });
      fetchGroups();
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
    }
  };

  return { groups, fetchGroups, createGroup };
});
