<script setup lang="ts">
import markerIcon from '../assets/marker-icon.png';

const props = defineProps<{
  position: [number, number];
  id: string;
}>();
</script>

<template>
  <ol-vector-layer :zIndex="2001">
    <ol-source-vector>
      <ol-feature>
        <ol-geom-point :coordinates="props.position"></ol-geom-point>
        <ol-style>
          <ol-style-icon :src="markerIcon" :scale="1">test</ol-style-icon>
          <!-- <ol-style-text
            color="white"
            :text="props.id"
            :scale="1.4"
          ></ol-style-text> -->
        </ol-style>
      </ol-feature>
    </ol-source-vector>
  </ol-vector-layer>
</template>

<!-- effis statistic -->
