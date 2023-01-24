<script setup lang="ts">
import markerIcon from '@/assets/marker-icon.png';

const props = defineProps<{
  position: [number, number];
}>();
</script>

<template>
  <ol-vector-layer>
    <ol-source-vector>
      <ol-feature>
        <ol-geom-point :coordinates="[40, 40]"></ol-geom-point>
        <ol-style>
          <ol-style-icon :src="markerIcon" :scale="1"></ol-style-icon>
        </ol-style>
      </ol-feature>
    </ol-source-vector>
  </ol-vector-layer>
</template>


<!-- effis statistic -->