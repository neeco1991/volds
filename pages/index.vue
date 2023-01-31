<script setup lang="ts">
import { useFires } from '~~/stores/fires';
import { useMap } from '~~/stores/map';

const router = useRouter();
const fires = useFires();
const map = useMap();

onMounted(async () => {
  const { query } = await router.currentRoute.value;
  if (
    query.fires === 'true' &&
    query.firesFrom &&
    query.firesTo &&
    query.firesArea
  ) {
    fires.setActive(true);
    await fires.fetchList(
      query.firesFrom as string,
      query.firesTo as string,
      Number(query.firesArea)
    );
  }
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
