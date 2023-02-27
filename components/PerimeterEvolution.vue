<script setup lang="ts">
import { format } from 'date-fns';
import { Fire } from '~~/stores/fires';

const props = defineProps<{
  data: Fire;
}>();

const mapData = () => ({
  labels: (props.data.dss_data || [])
    .filter((_, index) => index > 11)
    .map(({ date, duration_minutes }) => {
      const d = new Date(date);
      d.setMinutes(duration_minutes);
      return format(d, 'HH:mm');
    }),
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
