<script setup lang="ts">
const props = defineProps<{
  url: string;
  time: string;
  layers: string;
}>();
</script>

<template>
  <ol-image-layer :zIndex="1001">
    <ol-source-image-wms
      :url="props.url"
      :time="props.time"
      :layers="props.layers"
    />
  </ol-image-layer>
</template>
