import { computed, nextTick, unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useMicroParams<T extends string | string[]>(name: string, defaultValue?: T) {
  const route = useRoute();
  const router = useRouter();

  return computed<any>({
    get() {
      const data = route.params[name];
      if (data == null) return defaultValue ?? null;
      if (Array.isArray(data)) return data.filter(Boolean);
      return data;
    },
    set(v) {
      nextTick(() => {
        router[unref(mode)]({ params: { ...route.params, [name]: v } });
      });
    }
  });
}
