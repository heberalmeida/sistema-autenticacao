<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-700">Usuários</h1>
      <button @click="openModal()" class="bg-blue-500 text-white px-4 py-2 rounded">
        Novo Usuário
      </button>
    </div>

    <div class="mb-4 flex gap-4">
      <input v-model="search" type="text" placeholder="Buscar usuário ou e-mail" class="border px-2 py-1 rounded w-full" />
    </div>

    <div class="bg-white p-6 rounded shadow-lg">
      <LoadingSpinner v-if="loading" />
      <div v-else>
        <table class="w-full border-collapse border border-gray-200 hidden md:table">
          <thead>
            <tr class="bg-gray-50">
              <th class="border p-2">ID</th>
              <th class="border p-2">Nome</th>
              <th class="border p-2">E-mail</th>
              <th class="border p-2">Acessos</th>
              <th class="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id ?? 'temp'" class="border text-center">
              <td class="p-2">{{ user.id }}</td>
              <td class="p-2">{{ user.name }}</td>
              <td class="p-2">{{ user.email }}</td>
              <td class="p-2">
                {{ user.groups?.map(g => g.name).join(', ') || 'Sem Grupo' }}
              </td>
              <td class="p-2">
                <button @click="openModal(user)" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Editar
                </button>
                <button @click="confirmDelete(user)" class="bg-red-500 text-white px-2 py-1 rounded">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-for="user in filteredUsers" :key="user.id ?? 'temp'" class="block md:hidden bg-gray-100 p-4 mb-4 rounded-lg shadow">
            <h2 class="text-lg font-semibold">{{ user.name }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
            <p class="text-gray-500 text-sm">{{ user.groups?.map(g => g.name).join(', ') || 'Sem Grupo' }}</p>
            <div class="mt-2 flex gap-2">
              <button @click="openModal(user)" class="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
              <button @click="confirmDelete(user)" class="bg-red-500 text-white px-3 py-1 rounded">Excluir</button>
            </div>
          </div>

        <div v-if="filteredUsers.length === 0" class="text-center text-gray-500 mt-4">
          Nenhum usuário encontrado.
        </div>
      </div>
    </div>

    <UserModal
      v-if="showModal"
      :show="showModal"
      :user="selectedUser"
      :isEditing="isEditing"
      :groups="groupStore.groups"
      @close="closeModal"
      @save="saveUser"
    />

    <ConfirmModal
      v-if="showConfirmModal"
      :show="showConfirmModal"
      :itemName="userToDelete?.name || 'Usuário'"
      @confirm="deleteUser"
      @cancel="showConfirmModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useGroupStore } from '@/stores/useGroupStore';
import { userService } from '@/services/userService';
import UserModal from '@/components/UserModal.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import type { User } from '@/models/User';
import { useFilteredUsers } from '@/composables/useFilteredUsers'; 

const groupStore = useGroupStore();
const showModal = ref(false);
const isEditing = ref(false);
const selectedUser = ref<User | null>(null);
const search = ref('');
const loading = ref(true);
const users = ref<User[]>([]);
const showConfirmModal = ref(false);
const userToDelete = ref<User | null>(null);
  const { filteredUsers } = useFilteredUsers(users, search);

const fetchUsers = async () => {
  try {
    users.value = await userService.fetchUsers();
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchUsers();
  await groupStore.fetchGroups();
});

const openModal = (user: User | null = null) => {
  isEditing.value = !!user;
  selectedUser.value = user
    ? { ...user, group_ids: user.groups?.map(g => g.id) ?? [] }
    : { id: null, name: '', email: '', group_ids: [], password: '', groups: [] };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveUser = async (user: User) => {
  try {
    if (isEditing.value) {
      await userService.updateUser(user);
      users.value = users.value.map(u =>
        u.id === user.id ? { ...user, groups: groupStore.groups.filter(g => user.group_ids.includes(g.id)) } : u
      );
    } else {
      const newUser = await userService.createUser(user);
      if (newUser) {
        newUser.groups = groupStore.groups.filter(g => user.group_ids.includes(g.id));
        users.value.unshift(newUser);
      }
    }
    closeModal();
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
  }
};

const confirmDelete = (user: User) => {
  userToDelete.value = user;
  showConfirmModal.value = true;
};

const deleteUser = async () => {
  if (userToDelete.value && userToDelete.value.id !== null) {
    try {
      await userService.deleteUser(userToDelete.value.id);
      users.value = users.value.filter(user => user.id !== userToDelete.value!.id);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    } finally {
      showConfirmModal.value = false;
      userToDelete.value = null;
    }
  }
};

watch(showModal, (newValue) => {
  if (!newValue) {
    selectedUser.value = null;
  }
});

</script>
