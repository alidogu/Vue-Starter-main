import { createWebHistory, createRouter } from 'vue-router';

import routes from 'virtual:vue-routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect() {
        if (localStorage.getItem('accessToken')) return { path: '/dashboard' };
        return { path: '/dashboard' };
      },
    },

    ...routes,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

export default router;
