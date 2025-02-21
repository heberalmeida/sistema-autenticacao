<template>
    <div v-if="pagination.totalPages > 1" class="flex justify-between items-center mt-4">
      <button
        @click="changePage(pagination.currentPage - 1)"
        :disabled="pagination.currentPage === 1"
        class="bg-gray-200 px-4 py-2 rounded"
      >
        Anterior
      </button>
  
      <div class="flex gap-2">
        <button
          v-for="page in pageRange"
          :key="page"
          @click="changePage(page)"
          :class="['px-4 py-2 rounded', { 'bg-blue-500 text-white': page === pagination.currentPage }]"
        >
          {{ page }}
        </button>
      </div>
  
      <button
        @click="changePage(pagination.currentPage + 1)"
        :disabled="pagination.currentPage === pagination.totalPages"
        class="bg-gray-200 px-4 py-2 rounded"
      >
        Próxima
      </button>
  
      <span class="hidden md:block ml-auto px-4 py-2">Total: {{ pagination.totalItems }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = defineProps<{
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  }>();
  
  const emit = defineEmits(['pageChanged']);
  
  const pageRange = computed(() => {
    const totalPages = props.pagination.totalPages;
    const currentPage = props.pagination.currentPage;
    const range: number[] = [];
  
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i >= 1 && i <= totalPages) {
        range.push(i);
      }
    }
  
    if (range[0] > 1) range.unshift(1);
    if (range[range.length - 1] < totalPages) range.push(totalPages);
  
    return range;
  });
  
  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= props.pagination.totalPages) {
      emit('pageChanged', newPage);
    }
  };
  </script>
  