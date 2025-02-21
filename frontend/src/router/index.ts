import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import LayoutBase from '@/layouts/LayoutBase.vue';

const routes = [
  {
    path: '/dashboard',
    component: LayoutBase,
    children: [
      {
        path: '',
        component: () => import('@/views/DashboardView.vue'),
        meta: { hideSidebar: true },
      },
      { path: 'users', component: () => import('@/views/UsersView.vue') },
      { path: 'groups', component: () => import('@/views/GroupsView.vue') },
      { path: 'saude', component: () => import('@/views/SaudeView.vue') },
      { path: 'educacao', component: () => import('@/views/EducacaoView.vue') },
      { path: 'seguranca', component: () => import('@/views/SegurancaView.vue') },
    ],
    meta: { requiresAuth: true },
  },
  { path: '/login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', component: () => import('@/views/RegisterView.vue') },
  { path: '/', redirect: '/dashboard' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const userGroups = authStore.user?.groups || [];

  if (to.meta.requiresAuth && !authStore.token) {
    return next('/login');
  }

  const pagePermissions: Record<string, string> = {
    '/dashboard/saude': 'Saúde',
    '/dashboard/educacao': 'Educação',
    '/dashboard/seguranca': 'Segurança',
    '/dashboard/users': 'Administrador',
    '/dashboard/groups': 'Administrador',
  };

  const requiredGroup = pagePermissions[to.path];

  if (requiredGroup && !userGroups.some(group => group.name === requiredGroup)) {
    return next('/dashboard');
  }

  next();
});


export default router;
