<script setup lang="ts">
import green from '../assets/green-fire.png';
import yellow from '../assets/yellow-fire.png';
import red from '../assets/red-fire.png';
import { Fire } from '~~/stores/fires';

const props = defineProps<{
  fire: Fire;
}>();

const reference = ref<any>();

const getIcon = () => {
  if (props.fire.ranking === 2) {
    return red;
  } else if (props.fire.ranking === 1) {
    return yellow;
  }

  return green;
};

watch([reference, props.fire], () => {
  if (props.fire.selected) {
    reference.value.vectorLayer.setProperties({ zIndex: 2002 });
  } else {
    reference.value.vectorLayer.setProperties({ zIndex: 2001 });
  }
});
</script>

<template>
  <ol-vector-layer ref="reference" :zIndex="2001">
    <ol-source-vector>
      <ol-feature>
        <ol-geom-point
          :coordinates="props.fire.effis_data.centroid.coordinates"
        ></ol-geom-point>
        <ol-style>
          <ol-style-icon
            :src="getIcon()"
            :scale="props.fire.selected ? 0.3 : 0.15"
          >
          </ol-style-icon>
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
