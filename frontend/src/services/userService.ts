import { useApi } from '@/composables/useApi';
import type { User } from '@/models/User';

const { api } = useApi();

export const userService = {
  async fetchUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  async createUser(user: User): Promise<User> {
    const response = await api.post('/users', user);
    return response.data;
  },

  async updateUser(user: User) {
    await api.put(`/users/${user.id}`, user);
  },

  async deleteUser(id: number) {
    await api.delete(`/users/${id}`);
  },
};

