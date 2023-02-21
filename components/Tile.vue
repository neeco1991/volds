<script setup lang="ts">
import { LayerWithProps } from '~~/stores/layers';

const props = defineProps<{
  data: LayerWithProps;
}>();

const opacity = computed(() => props.data.opacity);
const reference = ref<any>();

watch([reference, opacity], () => {
  reference.value.imageLayer.setProperties({ opacity: opacity.value });
});
</script>

<template>
  <ol-image-layer ref="reference" :zIndex="props.data.zIndex">
    <ol-source-image-wms
      v-if="props.data.type === 'wms'"
      :url="props.data.url"
      :time="props.data.time"
      :layers="props.data.layers"
    />
  </ol-image-layer>

  <ol-tile-layer v-if="props.data.type === 'zyx'">
    <ol-source-xyz :url="props.data.url" />
  </ol-tile-layer>
</template>
