<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const userGroups = computed(() => authStore.user?.groups || []);

const isAdmin = computed(() => userGroups.value.some(group => group.name === 'Administrador'));

const canAccess = (groupName: string) => {
  return isAdmin.value || userGroups.value.some(group => group.name === groupName);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-if="isAdmin"
        class="bg-white p-6 rounded shadow-lg hover:bg-gray-50 cursor-pointer"
        @click="router.push('/dashboard/users')"
      >
        <h2 class="text-xl font-semibold">Usuários</h2>
        <p class="text-gray-500">Gerencie os usuários do sistema.</p>
      </div>

      <div
        v-if="isAdmin"
        class="bg-white p-6 rounded shadow-lg hover:bg-gray-50 cursor-pointer"
        @click="router.push('/dashboard/groups')"
      >
        <h2 class="text-xl font-semibold">Grupos</h2>
        <p class="text-gray-500">Gerencie grupos de usuários.</p>
      </div>

      <div
        v-if="canAccess('Saúde')"
        class="bg-white p-6 rounded shadow-lg hover:bg-gray-50 cursor-pointer"
        @click="router.push('/dashboard/saude')"
      >
        <h2 class="text-xl font-semibold">Saúde</h2>
        <p class="text-gray-500">Acesso ao setor de Saúde.</p>
      </div>

      <div
        v-if="canAccess('Educação')"
        class="bg-white p-6 rounded shadow-lg hover:bg-gray-50 cursor-pointer"
        @click="router.push('/dashboard/educacao')"
      >
        <h2 class="text-xl font-semibold">Educação</h2>
        <p class="text-gray-500">Acesso ao setor de Educação.</p>
      </div>

      <div
        v-if="canAccess('Segurança')"
        class="bg-white p-6 rounded shadow-lg hover:bg-gray-50 cursor-pointer"
        @click="router.push('/dashboard/seguranca')"
      >
        <h2 class="text-xl font-semibold">Segurança</h2>
        <p class="text-gray-500">Acesso ao setor de Segurança.</p>
      </div>
    </div>
  </div>
</template>
