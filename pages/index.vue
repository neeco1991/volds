<script lang="ts">
import { ref } from 'vue';
import Panel from '../components/Panel.vue';
export default {
  components: {
    Panel,
  },
  setup() {
    const center = ref([40, 40]);
    const projection = ref('EPSG:4326');
    const zoom = ref(8);
    const rotation = ref(0);
    return {
      center,
      projection,
      zoom,
      rotation,
    };
  },
};
</script>

<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 100vh"
  >
    <Panel
      :data="{
        overlays: [
          { title: 'TEST', position: [40, 40] },
          { title: 'TEST 2', position: [30, 30] },
          { title: 'TEST 3', position: [33, 37] },
          { title: 'TEST 4', position: [37, 38] },
          { title: 'TEST 5', position: [42, 42] },
        ],
        tiles: [
          {
            title: 'MODIS',
            url: 'https://maps.wild-fire.eu/gwis',
            time: '2022-01-10',
            layers: 'modis.hs',
          },
          {
            title: 'VIIRS',
            url: 'https://maps.wild-fire.eu/gwis',
            time: '2022-01-10',
            layers: 'viirs.hs',
          },
          {
            title: 'ECMWF',
            url: 'https://ies-ows.jrc.ec.europa.eu/effis',
            time: '2023-01-12',
            layers: 'ecmwf007.fwi',
          },
        ],
        markers: [
          {
            title: 'Marker 1',
            position: [45, 45],
          },
        ],
      }"
    ></Panel>

    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
  </ol-map>
</template>

<!-- ?service=WMS&request=GetMap&layers=modis.hs&styles=&format=image/png&transparent=true&version=1.1.1&singletile=false&time=2023-01-09/2023-01-10&width=2048&height=2048&srs=EPSG%3A3857&bbox=-20037508.342789244,0,0,20037508.34278071 -->
<!-- ?service=WMS&request=GetMap&layers=viirs.hs&styles=&format=image/png&transparent=true&version=1.1.1&singletile=false&time=2023-01-09/2023-01-10&width=2048&height=2048&srs=EPSG%3A3857&bbox=-20037508.342789244,0,0,20037508.34278071 -->
<!-- https://ies-ows.jrc.ec.europa.eu/effis?service=WMS&request=GetMap&layers=ecmwf007.fwi&styles=&format=image%2Fpng&transparent=true&version=1.1.1&singletile=false&time=2023-01-12&width=2048&height=2048&srs=EPSG%3A3857&bbox=-20037508.342789244,0,0,20037508.34278071 -->
