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
  <div style="width: 100%; height: 100%">
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
</template>
