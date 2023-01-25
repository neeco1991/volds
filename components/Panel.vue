<script setup lang="ts">
import { ref } from 'vue';
import OverlayItem from './OverlayItem.vue';
import Tile from './Tile.vue';
import Marker from './Marker.vue';
import { useTheme } from '../stores/theme';

export interface SimpleOverlayType {
  title: string;
  position: [number, number];
}

export interface MapType {
  url: string;
  title: string;
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
    types?: MapType[];
    overlays?: SimpleOverlayType[];
    tiles?: TileType[];
    markers?: MarkerType[];
  };
};

const props = defineProps<Props>();

const center = ref([10, 47]);
const projection = ref('EPSG:4326');
const zoom = ref(6);
const rotation = ref(0);

const mapUrl = ref('');

const theme = useTheme();

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

const types = ref(
  (props.data.types || []).map((element: MapType) => ({
    ...element,
    active: false,
  }))
);

mapUrl.value = types.value[0].url;
</script>

<template>
  <div id="overlay">
    <v-expansion-panels multiple>
      <v-expansion-panel v-if="types.length" :bg-color="theme.primary">
        <v-expansion-panel-title>Map type</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-radio-group v-model="mapUrl">
            <v-radio
              v-for="type in types"
              :key="type.title"
              :label="type.title"
              :value="type.url"
            ></v-radio>
          </v-radio-group>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="overlays.length" :bg-color="theme.primary">
        <v-expansion-panel-title>Overlays</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-switch
            v-for="overlay in overlays"
            :label="`${overlay.title}`"
            v-model="overlay.active"
          ></v-switch>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="tiles.length" :bg-color="theme.primary">
        <v-expansion-panel-title>Tiles</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-switch
            v-for="tile in tiles"
            :label="`${tile.title}`"
            v-model="tile.active"
          ></v-switch>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="markers.length" :bg-color="theme.primary">
        <v-expansion-panel-title>Markeres</v-expansion-panel-title>
        <v-expansion-panel-text
          ><v-switch
            v-for="marker in markers"
            :label="`${marker.title}`"
            v-model="marker.active"
          ></v-switch
        ></v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

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

    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm :url="mapUrl" />
    </ol-tile-layer>
  </div>
</template>

<style scoped>
#overlay {
  position: absolute;
  top: 2%;
  left: 1%;
  width: 400px;
  max-height: 96%;
  z-index: 1000;
}
</style>
