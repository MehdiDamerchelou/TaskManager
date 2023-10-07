import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/HeaderSite.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'doneTask',
        component: () => import('components/HistoryTask.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'activeTask',
        component: () => import('components/ActiveTask.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'addDuty',
        component: () => import('components/NewTaskForUsers.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'newTask',
        component: () => import('components/RegisterNewTask.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'export',
        component: () => import('components/ExportData.vue'),
      },
    ],
  },
  {
    path: '/new/user',
    name: 'newUser',
    component: () => import('components/NewUser.vue'),
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('components/LogIn.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
