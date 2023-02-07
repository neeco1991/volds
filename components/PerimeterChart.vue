<script setup lang="ts">
import { useMap } from '~~/stores/map';

const props = defineProps<{
  center: [number, number];
  perimeter: number[][][][];
  loading: boolean;
  error: boolean;
}>();

const map = useMap();

const projection = ref('EPSG:4326');
const zoom = ref(13);
const rotation = ref(0);
const borderWidth = ref(5);
</script>

<template>
  <div v-if="!loading && !error" style="width: 100%; height: 100%">
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%"
    >
      <ol-view
        ref="view"
        :center="props.center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
      <ol-tile-layer>
        <ol-source-osm :url="map.getUrl" />
      </ol-tile-layer>

      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-multi-polygon
              :coordinates="props.perimeter"
            ></ol-geom-multi-polygon>
            <ol-style>
              <ol-style-stroke
                color="red"
                :width="borderWidth"
              ></ol-style-stroke>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>
  </div>
  <v-card
    v-else-if="error"
    color="error"
    class="w-full h-full mx-auto"
    max-width="344"
    style="width: 100%; height: 100%"
  >
    <v-card-item style="width: 100%; height: 100%">
      <div
        class="text-h6"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        "
      >
        Error loading data
      </div>
    </v-card-item>
  </v-card>
  <v-card
    :loading="true"
    v-else-if="loading"
    color="grey lighten-4"
    class="w-full h-full mx-auto"
    max-width="344"
    style="width: 100%; height: 100%"
  >
    <v-card-item style="width: 100%; height: 100%">
      <div
        class="text-h6"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        "
      >
        Loading data...
      </div>
    </v-card-item>
  </v-card>
</template>
