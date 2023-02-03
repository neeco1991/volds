// plugins/pinia.ts
import { markRaw } from 'vue';
import { useRouter } from 'vue-router';
import { Router } from 'vue-router';
import { PiniaPluginContext } from 'pinia';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

function routerPlugin({ store }: PiniaPluginContext) {
  const router = useRouter();
  store.router = markRaw(router);
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(routerPlugin);
});
