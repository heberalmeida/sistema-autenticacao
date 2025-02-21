<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-lg w-96">
            <h2 class="text-xl font-semibold mb-4">
                {{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}
            </h2>

            <div class="mb-2">
                <label class="block text-sm font-medium">Nome</label>
                <input v-model="userData.name" type="text" class="w-full border px-2 py-1 rounded" />
            </div>

            <div class="mb-2">
                <label class="block text-sm font-medium">E-mail</label>
                <input v-model="userData.email" type="email" class="w-full border px-2 py-1 rounded" />
            </div>

            <div class="mb-2">
                <label class="block text-sm font-medium">Senha</label>
                <input v-model="userData.password" type="password" class="w-full border px-2 py-1 rounded"
                       placeholder="Deixe em branco para não alterar" />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium">Grupos</label>
                <label v-for="group in groups" :key="group.id" class="flex items-center gap-2">
                    <input
                        type="checkbox"
                        :value="group.id"
                        v-model="selectedGroups"
                        @change="handleGroupSelection(group.id)"
                    />
                    <span>{{ group.name }}</span>
                </label>
            </div>

            <div class="flex justify-end">
                <button @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                    Cancelar
                </button>
                <button @click="handleSave" class="bg-blue-500 text-white px-4 py-2 rounded">
                    Salvar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { User } from '@/models/User';

const props = defineProps<{
    show: boolean;
    user: User | null;
    isEditing: boolean;
    groups: Array<{ id: number; name: string }>;
}>();

const emit = defineEmits(['close', 'save']);

const selectedGroups = ref<number[]>([]);
const userData = ref<User>({
    id: null,
    name: '',
    email: '',
    password: '',
    group_ids: [],
});

const ADMIN_GROUP_ID = 1;

watch(
    () => props.user,
    (newUser) => {
        if (newUser) {
            userData.value = { 
                id: newUser.id, 
                name: newUser.name, 
                email: newUser.email, 
                password: '',
                group_ids: [...(newUser.group_ids ?? [])] 
            };
            selectedGroups.value = [...(newUser.group_ids ?? [])];
        } else {
            userData.value = { id: null, name: '', email: '', password: '', group_ids: [] };
            selectedGroups.value = [];
        }
    },
    { immediate: true }
);

const handleGroupSelection = (groupId: number) => {
    if (groupId === ADMIN_GROUP_ID) {
        if (selectedGroups.value.includes(ADMIN_GROUP_ID)) {
            selectedGroups.value = props.groups.map(group => group.id);
        } else {
            selectedGroups.value = [];
        }
    } else {
        if (!selectedGroups.value.includes(groupId)) {
            selectedGroups.value = selectedGroups.value.filter(id => id !== ADMIN_GROUP_ID);
        }
    }
};

const handleSave = () => {
    emit('save', { 
        ...userData.value, 
        group_ids: selectedGroups.value 
    });
};
</script>
