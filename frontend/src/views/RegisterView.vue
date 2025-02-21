<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const register = async () => {
  try {
    await authStore.register(name.value, email.value, password.value);
  } catch (error) {
    errorMessage.value = 'Erro ao registrar. Verifique seus dados!';
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="w-96 p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-xl font-bold text-center mb-4">Registrar</h1>
      <input v-model="name" placeholder="Nome" class="border p-2 w-full mb-3" />
      <input v-model="email" placeholder="E-mail" class="border p-2 w-full mb-3" />
      <input v-model="password" type="password" placeholder="Senha" class="border p-2 w-full mb-3" />
      <button @click="register" class="bg-blue-500 text-white p-2 w-full">Registrar</button>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>
