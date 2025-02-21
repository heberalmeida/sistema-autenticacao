<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Confirmação</h2>
        <p class="mb-4">Tem certeza que deseja excluir <strong>{{ itemName }}</strong>?</p>
  
        <div class="flex justify-end">
          <button @click="$emit('cancel')" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
          <button @click="$emit('confirm')" class="bg-red-500 text-white px-4 py-2 rounded">Confirmar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    show: boolean;
    itemName: string;
  }>();
  
  defineEmits(['confirm', 'cancel']);
  </script>
  