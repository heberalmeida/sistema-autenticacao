import { useApi } from '@/composables/useApi';
import type { User } from '@/models/User';

const { api } = useApi();

export const userService = {
  async fetchUsers(search: string = '', page: number = 1): Promise<{
    total: number; data: User[], current_page: number, last_page: number 
}> {
    const params = new URLSearchParams();
    if (search) {
      params.append('search', search);
    }
    params.append('page', page.toString());
    const response = await api.get('/users', { params });
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
