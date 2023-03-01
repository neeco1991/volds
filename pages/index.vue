<script setup lang="ts">
import { Coordinate } from 'ol/coordinate';
import MapEvent from 'ol/MapEvent';
import { useFires } from '~~/stores/fires';
import { useMap } from '~~/stores/map';
// import { useRouterStore } from '~~/stores/routerStore';

// const r = useRouterStore();
const fires = useFires();
const map = useMap();

const olmap = ref<any>();

onMounted(async () => {
  await fires.init();

  olmap.value.map.on('moveend', (e: MapEvent) => {
    const center = e.map.getView().getCenter() as [number, number];
    const zoom = e.map.getView().getZoom() as number;
    map.setCenter(center);
    map.setZoom(zoom);
  });
});
</script>

<template>
  <div class="main-page">
    <Topbar style="z-index: 1000"></Topbar>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%; position: relative"
      ref="olmap"
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
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
