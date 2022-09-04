<template>
  <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <wujie-vue
      width="100vw"
      height="100vh"
      :name="name"
      :setup-app="{ alive: true }"
      :url="littleUrl"
      :sync="true" />
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router';
// import hostMap from '@/hostMap.js';
// import { computed } from 'vue';
// const route = useRoute();
// const littleUrl = computed(() => {
//   const host = hostMap(`//localhost:10811`);
//   const params: any = route.query['little-law-butler']
//     ? route.query['little-law-butler']
//     : '#/login';
//   console.log(
//     '🚀 ~ file: little-law-butler.vue ~ line 25 ~ littleUrl ~ params ? `${host}${params}` : host',
//     params ? `${host}${params}` : host
//   );

//   return params ? `${host}${params}` : host;
// });

// const afterMount = () => console.log('afterMount');
import { useRoute, useRouter } from 'vue-router';
import hostMap from '@/hostMap.js';
import { computed } from 'vue';
const name = 'little-law-butler';
const route = useRoute();
const isCurrentMicroApp = (str: string) => str === name;

const littleUrl = computed(() => {
  const host = hostMap(`//localhost:10811`);
  const params: any = route.query[name];
  const path = route.path
    .split('/')
    .filter((item) => item && !isCurrentMicroApp(item))
    .join('/');
  console.log(
    "🚀 ~ file: little-law-butler.vue ~ line 48 ~ cuUrl ~ `${host}${path || ''}${params || ''}`",
    `${host}${path || ''}${params || ''}`,
    host,
    path || 'path',
    params || 'params',
    route.path.split('/').filter((item) => !isCurrentMicroApp(item))
  );

  return `${host}${path || '#/'}${params || ''}`;
});
</script>

<style lang="scss" scoped></style>
