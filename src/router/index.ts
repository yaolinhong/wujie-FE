import { App } from 'vue';
import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import { createRouterGuards } from './routerGuards';
import { cuRoute } from './modules/customer-service-manager';
import { littleRoute } from './modules/little-law-butler';

const littleLawButler = () => import('@/components/micro-FE/little-law-butler.vue');
const customerServiceManager = () => import('@/components/micro-FE/customer-service-manager.vue');
const pathFormat = (str: string) => str.substring(str.includes('/') ? str.indexOf('/') + 1 : 0);

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'little-law-butler',
    component: littleLawButler,
    meta: {
      title: 'little'
    },
    children: littleRoute.map((item) => {
      return { ...item, path: `#${item.path}`, component: littleLawButler };
    })
  },
  {
    path: '/customer-service-manager',
    name: 'customer-service-manager',
    component: customerServiceManager,
    meta: {
      title: 'customer-service-manager'
    },
    children: cuRoute.map((item) => {
      return { ...item, name: `${pathFormat(item.path)}`, component: customerServiceManager };
    })
  }
];

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router;
