<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-semibold text-red-600 mb-4">Erro</h2>
        <p class="text-gray-700">{{ message }}</p>
        <button @click="closeModal" class="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full">
          Fechar
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  defineProps<{ isOpen: boolean; message: string }>();
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  