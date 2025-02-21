<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Login</h2>
            
            <form @submit.prevent="login">
                <input
                    v-model="email"
                    type="email"
                    placeholder="E-mail"
                    class="w-full border px-3 py-2 rounded-md mb-2"
                    :class="{'border-red-500': emailError}"
                />
                <p v-if="emailError" class="text-red-500 text-sm mb-2">{{ emailError }}</p>
                
                <input
                    v-model="password"
                    type="password"
                    placeholder="Senha"
                    class="w-full border px-3 py-2 rounded-md mb-2"
                    :class="{'border-red-500': passwordError}"
                />
                <p v-if="passwordError" class="text-red-500 text-sm mb-2">{{ passwordError }}</p>
                
                <button
                    type="submit"
                    class="w-full bg-blue-600 text-white p-2 rounded-md flex items-center justify-center"
                    :disabled="isLoading"
                >
                    <svg
                        v-if="isLoading"
                        class="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8v4l3-3m-3 3H4z"></path>
                    </svg>
                    <span>{{ isLoading ? 'Entrando...' : 'Entrar' }}</span>
                </button>
            </form>

            <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

onMounted(() => {
    if (authStore.token) {
        router.push('/dashboard');
    }
});

const login = async () => {
    emailError.value = '';
    passwordError.value = '';
    errorMessage.value = '';

    if (!email.value.trim()) {
        emailError.value = 'O e-mail é obrigatório';
    }

    if (!password.value.trim()) {
        passwordError.value = 'A senha é obrigatória';
    }

    if (emailError.value || passwordError.value) {
        return;
    }

    isLoading.value = true;

    try {
        await authStore.login(email.value, password.value);
        router.push('/dashboard');
    } catch (error) {
        errorMessage.value = 'Credenciais inválidas';
    } finally {
        isLoading.value = false;
    }
};
</script>