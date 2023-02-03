<script setup lang="ts">
import { useFires } from '~~/stores/fires';
// import { useRouterStore } from '~~/stores/routerStore';

// const r = useRouterStore();
const fires = useFires();

onMounted(async () => {
  await fires.init();
});
</script>

<template>
  <div class="main-page">
    <Topbar style="z-index: 1000"></Topbar>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%; position: relative"
    >
      <Overlay></Overlay>
    </ol-map>
  </div>
</template>

<style>
.main-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
