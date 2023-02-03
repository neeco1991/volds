<script setup lang="ts">
import { useSettings } from '~~/stores/settings';
import { useMap } from '~~/stores/map';

const settings = useSettings();
const map = useMap();

const center = ref([10, 47]);
const projection = ref('EPSG:4326');
const zoom = ref(6);
const rotation = ref(0);

const data = {
  types: [
    {
      url: 'https://api.maptiler.com/maps/b4cf7807-a184-42bd-af0e-2fe3e9a845f8/{z}/{x}/{y}.jpg?key=pNUD8X90rA79U5qeh6na',
      title: 'Satellite Hybrid',
      id: 'satellite',
    },
    {
      url: 'https://api.maptiler.com/maps/7c7075ad-4695-4ff1-8144-32e3babcbd1b/{z}/{x}/{y}.jpg?key=pNUD8X90rA79U5qeh6na',
      title: 'Topographic + Water Bodies',
      id: 'topographic',
    },
    {
      url: 'https://api.maptiler.com/maps/2d7bca5f-4d83-4c77-af69-b35b7766c443/{z}/{x}/{y}.jpg?key=pNUD8X90rA79U5qeh6na',
      title: 'Streets',
      id: 'streets',
    },
  ],
  tiles: [
    {
      title: 'Fire Weather Index (FWI))',
      id: 'fwi',
      type: 'wms',
      url: 'https://ies-ows.jrc.ec.europa.eu/effis',
      time: new Date().toISOString().slice(0, 10),
      layers: 'ecmwf007.fwi',
    },
    {
      title: 'GHSL Built up',
      id: 'ghsl',
      type: 'wms',
      url: 'https://ies-ows.jrc.ec.europa.eu/gwis',
      time: new Date().toISOString().slice(0, 10),
      layers: 'ghsl',
    },
    {
      title: 'Corine Land Cover',
      id: 'corine',
      type: 'wms',
      url: 'https://ies-ows.jrc.ec.europa.eu/effis',
      time: new Date().toISOString().slice(0, 10),
      layers: 'corine.l2',
    },
    {
      title: 'Fuels',
      id: 'fuels',
      type: 'wms',
      url: 'https://ies-ows.jrc.ec.europa.eu/effis',
      time: new Date().toISOString().slice(0, 10),
      layers: 'fuel_map',
    },
    {
      title: 'Water',
      id: 'water',
      type: 'zyx',
      url: 'https://storage.googleapis.com/global-surface-water/maptiles/transitions/{z}/{x}/{y}.png',
      time: new Date().toISOString().slice(0, 10),
      layers: 'fuel_map',
    },
  ],
  activeFireSelector: true,
};

onMounted(async () => {
  map.init(data.types);
});
</script>

<template>
  <div id="overlay">
    <Panel v-if="settings.active" :data="data"></Panel>

    <Comparator></Comparator>

    <ListOfFires></ListOfFires>

    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm :url="map.url" />
    </ol-tile-layer>
  </div>
</template>

<style scoped>
#overlay {
  position: absolute;
  justify-content: space-between;
  display: flex;
  top: 2%;
  left: 1%;
  right: 1%;
  height: 100%;
  max-height: 96%;
  border-radius: 4px;
}

#overlay::-webkit-scrollbar {
  display: none;
}
</style>
