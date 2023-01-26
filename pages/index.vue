<script lang="ts">
import Panel from '../components/Panel.vue';
</script>

<template>
  <div class="main-page">
    <Topbar style="z-index: 1000"></Topbar>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%; position: relative"
    >
      <Panel
        :data="{
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
        }"
      ></Panel>

      <ListOfFires></ListOfFires>
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

<!-- ?service=WMS&request=GetMap&layers=modis.hs&styles=&format=image/png&transparent=true&version=1.1.1&singletile=false&time=2023-01-09/2023-01-10&width=2048&height=2048&srs=EPSG%3A3857&bbox=-20037508.342789244,0,0,20037508.34278071 -->
<!-- ?service=WMS&request=GetMap&layers=viirs.hs&styles=&format=image/png&transparent=true&version=1.1.1&singletile=false&time=2023-01-09/2023-01-10&width=2048&height=2048&srs=EPSG%3A3857&bbox=-20037508.342789244,0,0,20037508.34278071 -->
<!-- https://ies-ows.jrc.ec.europa.eu/effis?service=WMS&request=GetMap&layers=ecmwf007.fwi&styles=&format=image%2Fpng&transparent=true&version=1.1.1&singletile=false&time=2023-01-12&width=2048&height=2048&srs=EPSG%3A3857&bbox=-20037508.342789244,0,0,20037508.34278071 -->
