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
            },
            {
              url: 'https://api.maptiler.com/maps/7c7075ad-4695-4ff1-8144-32e3babcbd1b/{z}/{x}/{y}.jpg?key=pNUD8X90rA79U5qeh6na',
              title: 'Topographic + Water Bodies',
            },
            {
              url: 'https://api.maptiler.com/maps/2d7bca5f-4d83-4c77-af69-b35b7766c443/{z}/{x}/{y}.jpg?key=pNUD8X90rA79U5qeh6na',
              title: 'Streets',
            },
          ],
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
