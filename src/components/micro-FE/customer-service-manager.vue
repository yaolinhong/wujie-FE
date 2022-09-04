<template>
  <wujie-vue
      width="100vw"
      height="100vh"
      :name="name"
      :setup-app="{ alive: true }"
      :after-mount="afterMount"
      :url="cuUrl"
      :sync="true" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import hostMap from '@/hostMap.js';
import { computed } from 'vue';
const name = 'customer-service-manager';
const route = useRoute();
const isCurrentMicroApp = (str: string) => str === name;

const cuUrl = computed(() => {
  const host = hostMap(`//localhost:8080`);
  const params: any = route.query[name];
  const path = route.path
    .split('/')
    .filter((item) => !isCurrentMicroApp(item))
    .join('/');

  return `${host}${path || ''}${params || ''}`;
});

const afterMount = () => console.log('afterMount');
</script>

<style lang="scss" scoped></style>
