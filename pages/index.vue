<script setup lang="ts">
import { Coordinate } from 'ol/coordinate';
import MapEvent from 'ol/MapEvent';
import { Fire, useFires } from '~~/stores/fires';
import { useMap } from '~~/stores/map';
import Select from 'ol/interaction/Select.js';
import { click } from 'ol/events/condition.js';
import { Fill, Stroke, Style } from 'ol/style.js';
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

  olmap.value.map.on('click', (e: any) => {
    const zoom = e.map.getView().getZoom() as number;
    const squaredZoom = Math.pow(2, zoom);

    const nearFires: (Fire & { distance: number })[] = [];
    fires.list.forEach((f) => {
      const c = f.effis_data.centroid.coordinates as [number, number];
      const distance = Math.sqrt(
        Math.pow(c[0] - e.coordinate[0], 2) +
          Math.pow(c[1] - e.coordinate[1], 2)
      );
      if (distance < 20 / squaredZoom) {
        nearFires.push({ ...f, distance });
      }
    });

    // find nearest fire
    if (nearFires.length > 0) {
      nearFires.sort((a, b) => a.distance - b.distance);
      fires.setSelected(nearFires[0]);
    } else {
      fires.setSelected(null);
    }
  });
});
</script>

<template>
  <main class="main-page">
    <Topbar style="z-index: 1000"></Topbar>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%; position: relative"
      ref="olmap"
    >
      <Overlay></Overlay>
    </ol-map>
  </main>
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
