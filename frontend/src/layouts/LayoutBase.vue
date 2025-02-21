<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Sistema</h1>

      <nav class="hidden md:flex space-x-6">
        <RouterLink v-for="item in filteredMenuItems" :key="item.name" :to="item.route"
          :class="['hover:text-gray-600', isActive(item.route) ? 'text-blue-600 font-bold' : '']">
          {{ item.label }}
        </RouterLink>
      </nav>

      <button @click="isMenuOpen = !isMenuOpen"
        class="md:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">
        ☰
      </button>

      <button @click="logout" class="hidden md:block bg-red-500 text-white px-4 py-2 rounded">
        Sair
      </button>
    </header>

    <div v-if="isMenuOpen"
      class="absolute top-0 left-0 w-full bg-white shadow-md p-4 z-50 md:hidden max-h-screen overflow-auto">

      <button @click="isMenuOpen = false" class="absolute top-2 right-2 p-2 bg-gray-300 rounded-md">
        ✖
      </button>

      <nav class="flex flex-col space-y-4 mt-8 text-center">
        <RouterLink v-for="item in filteredMenuItems" :key="item.name" :to="item.route" @click="isMenuOpen = false"
          class="block p-2 hover:bg-gray-200">
          {{ item.label }}
        </RouterLink>
        <button @click="logout" class="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full">
          Sair
        </button>
      </nav>
    </div>

    <main class="flex-1 p-6 overflow-y-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isMenuOpen = ref(false);

const userGroups = computed(() => authStore.user?.groups || []);
const isAdmin = computed(() => userGroups.value.some(group => group.name === 'Administrador'));

const menuItems = [
  { name: 'dashboard', label: 'Dashboard', route: '/dashboard', access: 'all' },
  { name: 'users', label: 'Usuários', route: '/dashboard/users', access: 'Administrador' },
  { name: 'groups', label: 'Grupos', route: '/dashboard/groups', access: 'Administrador' },
  { name: 'saude', label: 'Saúde', route: '/dashboard/saude', access: 'Saúde' },
  { name: 'educacao', label: 'Educação', route: '/dashboard/educacao', access: 'Educação' },
  { name: 'seguranca', label: 'Segurança', route: '/dashboard/seguranca', access: 'Segurança' }
];

const filteredMenuItems = computed(() => {
  return menuItems.filter(item =>
    item.access === 'all' ||
    isAdmin.value ||
    userGroups.value.some(group => group.name === item.access)
  );
});

const isActive = (menuRoute: string) => {
  return route.path.startsWith(menuRoute);
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
