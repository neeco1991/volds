<script setup lang="ts">
import { Fire } from '~~/stores/fires';

const props = defineProps<{
  data: Fire;
}>();

const mapData = () => ({
  labels: (props.data.dss_data || [])
    .filter((_, index) => index > 11)
    .map(({ date, duration_minutes }) => duration_minutes.toString()),
  datasets: [
    {
      label: 'Perimeter',
      data: (props.data?.dss_data || [])
        .filter((_, index) => index > 11)
        .map((item) => item.perimeter),
    },
  ],
});
</script>

<template>
  <LineChart
    v-if="props.data.dss_data && props.data.dss_data.length > 1"
    :loaded="true"
    :error="false"
    :data="mapData()"
  ></LineChart>
  <NoData v-else></NoData>
</template>
