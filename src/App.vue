<template>
  <div class="left">
    <h1 style="color: red">浏览器切tab效果(废弃)</h1>
    <br />
    <a
        style="border: 1px solid red"
        @click="toMicroApp('little-law-butler')"
      >little-law-butler</a
    >
    <br />
    <a
        style="border: 1px solid red"
        @click="toMicroApp('customer-service-manager')"
      >customer-service-manager</a
    >
    <br />
  </div>

  <div class="right">
    <h1 style="color: red">路由跳转(即菜单)</h1>

    <div class="divider">-**以下是little**---</div>
    <button
        style="border: 1px solid red"
        @click="router.push({ name: 'institutions' })">
      institutions
    </button>
    <br />
    <button
        v-for="item in routes[0].children"
        :key="item.path"
        style="border: 1px solid red"
        @click="router.push({ name: item.name })">
      {{ item.name }}
    </button>
    <br />
    <div class="divider">-**以下是cu**---</div>
    <button
        v-for="item in routes[1].children"
        :key="item.path"
        style="border: 1px solid red"
        @click="router.push({ name: item.name })">
      {{ item.name }}
    </button>
    <br />
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import { nextTick } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { routes } from '@/router';

interface routeStateType {
  'little-law-butler': string;
  'customer-service-manager': string;
}
type routeStateKey = string & keyof routeStateType;
const router = useRouter();
const route = useRoute();

const routeState: routeStateType = reactive({
  'little-law-butler': '',
  'customer-service-manager': ''
});
const setCurrentRouteState = () => {
  Object.keys(route.query).forEach((key) => {
    const url = new URL(window.location.toString());
    const params = new URLSearchParams(url.search) || '';
    const value = params.get(key);
    if (key in routeState) {
      routeState[key as routeStateKey] = value || '';
    }
  });
};
const toMicroApp = (key: routeStateKey) => {
  console.clear();
  // 保存当前子应用路由状态
  setCurrentRouteState();
  // 切换另一个子应用
  nextTick(() => {
    router.push({
      name: key,
      query: {
        [key]: routeState[key]
      }
    });
  });
};

console.log('🚀 ~ file: App.vue ~ line 22 ~ route', route, route.params);
</script>

<style>
body {
  margin: 0;
}

.left {
  font-size: 16px;
  position: fixed;
  background: #fff;

  bottom: 0;
  left: 300px;
  z-index: 99999;
}
button {
  font-size: 16px;
  margin-bottom: 8px;
  border-radius: 3px;
}
.divider {
  width: 100%;
  text-align: center;
  color: red;
  margin-bottom: 8px;
}
.right {
  height: 60%;
  width: 200px;
  overflow-y: auto;
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 99999;
}
#app {
}
</style>
