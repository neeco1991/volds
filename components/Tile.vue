<script setup lang="ts">
const props = defineProps<{
  url: string;
  type: string;
  time: string;
  layers: string;
}>();
</script>

<template>
  <ol-image-layer :zIndex="1001">
    <ol-source-image-wms
      v-if="props.type === 'wms'"
      :url="props.url"
      :time="props.time"
      :layers="props.layers"
    />
  </ol-image-layer>

  <ol-tile-layer v-if="props.type === 'zyx'">
    <ol-source-xyz :url="props.url" />
  </ol-tile-layer>
</template>
