import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  Router.beforeEach(async (to, from) => {
    if (to.name == 'dashboard' || to.name == 'login' || to.name == 'newUser') {
      return;
    }
    const tt: string | null = localStorage.getItem('authentication');
    if (tt === null) {
      return 401;
    }
    if (tt == undefined) {
      return {
        name: 'login',
      };
    }
    // const token = JSON.parse(tt).accessToken;

    // if (typeof token === 'string') {
    //   return;
    // }
  });
  return Router;
});
