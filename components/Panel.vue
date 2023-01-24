<script setup lang="ts">
import { ref } from 'vue';
import OverlayItem from './OverlayItem.vue';
import Tile from './Tile.vue';
import Marker from './Marker.vue';

export interface SimpleOverlayType {
  title: string;
  position: [number, number];
}

export interface TileType {
  title: string;
  url: string;
  time: string;
  layers: string;
}

export interface MarkerType {
  position: [number, number];
  title: string;
}

type Props = {
  data: {
    overlays?: SimpleOverlayType[];
    tiles?: TileType[];
    markers?: MarkerType[];
  };
};

const props = defineProps<Props>();

const overlays = ref(
  (props.data.overlays || []).map((element: SimpleOverlayType) => ({
    ...element,
    active: false,
  }))
);

const tiles = ref(
  (props.data.tiles || []).map((element: TileType) => ({
    ...element,
    active: false,
  }))
);

const markers = ref(
  (props.data.markers || []).map((element: MarkerType) => ({
    ...element,
    active: false,
  }))
);
</script>

<template>
  <div id="overlay">
    <v-card>
      <div class="menu-title">Overlays</div>
      <div class="menu-selector" v-for="overlay in overlays">
        <v-switch
          :label="`${overlay.title}`"
          v-model="overlay.active"
        ></v-switch>
      </div>

      <div class="menu-title">Tiles</div>
      <div class="menu-selector" v-for="tile in tiles">
        <v-switch :label="`${tile.title}`" v-model="tile.active"></v-switch>
      </div>

      <div class="menu-title">Markers</div>
      <div class="menu-selector" v-for="marker in markers">
        <v-switch :label="`${marker.title}`" v-model="marker.active"></v-switch>
      </div>

      <div v-for="(overlay, index) in overlays">
        <OverlayItem
          v-if="overlay.active"
          :key="index.toString()"
          :title="overlay.title"
          :position="overlay.position"
        ></OverlayItem>
      </div>

      <div v-for="(tile, index) in tiles">
        <Tile
          v-if="tile.active"
          :key="index.toString()"
          :url="tile.url"
          :time="tile.time"
          :layers="tile.layers"
        ></Tile>
      </div>

      <div v-for="(marker, index) in markers">
        <Marker
          v-if="marker.active"
          :key="index.toString()"
          :position="marker.position"
        ></Marker>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
#overlay {
  position: absolute;
  top: 4%;
  left: 1%;
  width: 400px;
  max-height: 96%;
  z-index: 1000;
}

.menu-title {
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}

.menu-selector {
  padding: 10px;
  height: 70px;
}
</style>
