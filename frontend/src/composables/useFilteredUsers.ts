import { computed, type Ref } from 'vue';
import type { User } from '@/models/User';

export function useFilteredUsers(users: Ref<User[]>, search: Ref<string>) {
  const filteredUsers = computed(() => {
    if (!search.value.trim()) return users.value;

    const searchTerms = search.value.toLowerCase().split(/\s+/);

    return users.value.filter(user => {
      const fullName = user.name.toLowerCase();
      const email = user.email.toLowerCase();

      return searchTerms.every(term => fullName.includes(term) || email.includes(term));
    });
  });

  return { filteredUsers };
}
