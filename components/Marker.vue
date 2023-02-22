<script setup lang="ts">
import green from '../assets/green-fire.png';
import yellow from '../assets/yellow-fire.png';
import red from '../assets/red-fire.png';
import { useFires } from '~~/stores/fires';

const fires = useFires();

const props = defineProps<{
  position: [number, number];
  id: number;
  ranking: 0 | 1 | 2;
}>();

const reference = ref<any>();
const selected = computed(() => fires.selected);

const getIcon = () => {
  if (props.ranking === 2) {
    return red;
  } else if (props.ranking === 1) {
    return yellow;
  }

  return green;
};

watch([reference, selected], () => {
  if (selected.value === props.id) {
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
        <ol-geom-point :coordinates="props.position"></ol-geom-point>
        <ol-style>
          <ol-style-icon
            :src="getIcon()"
            :scale="fires.selected === props.id ? 0.3 : 0.15"
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
