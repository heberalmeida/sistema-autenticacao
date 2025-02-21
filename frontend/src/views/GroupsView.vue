<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGroupStore } from '@/stores/useGroupStore';

const groupStore = useGroupStore();
const newGroupName = ref('');

onMounted(() => {
  groupStore.fetchGroups();
});

const createGroup = async () => {
  if (!newGroupName.value) return;
  await groupStore.createGroup(newGroupName.value);
  newGroupName.value = '';
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-2xl font-bold mb-4">Gerenciar Grupos</h1>

    <div class="bg-white p-4 rounded shadow mb-6">
      <h2 class="text-lg font-semibold mb-2">Criar Novo Grupo</h2>
      <div class="flex">
        <input v-model="newGroupName" class="border p-2 w-full" placeholder="Nome do grupo" />
        <button @click="createGroup" class="bg-blue-500 text-white px-4 py-2 ml-2">Criar</button>
      </div>
    </div>

    <div class="rounded shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Lista de Grupos</h2>
      <table class="w-full border-collapse border border-gray-200 bg-white">
        <thead>
          <tr class="bg-gray-50">
            <th class="border p-2">ID</th>
            <th class="border p-2">Nome</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groupStore.groups" :key="group.id" class="border">
            <td class="p-2 text-center">{{ group.id }}</td>
            <td class="p-2">{{ group.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
