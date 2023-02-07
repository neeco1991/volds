<script setup lang="ts">
import { Fire } from '~~/stores/fires';

const props = defineProps<{
  data: Fire | null;
  loading: boolean;
  error: boolean;
}>();

const mapData = () => ({
  labels: (props.data?.dss_data || [])
    .filter((_, index) => index > 11)
    .map(({ date, duration_minutes }) => duration_minutes.toString()),
  datasets: [
    {
      label: 'Perimeter',
      backgroundColor: '#f87979',
      data: (props.data?.dss_data || [])
        .filter((_, index) => index > 11)
        .map((item) => item.perimeter),
    },
  ],
});
</script>

<template>
  <LineChart
    v-if="props.data?.dss_data && props.data.dss_data.length > 1"
    :loaded="!props.loading"
    :error="props.error"
    :data="mapData()"
  ></LineChart>
  <v-card
    v-else
    color="grey lighten-4"
    class="w-full h-full mx-auto"
    style="height: 160px"
  >
    <v-card-item style="height: 100%">
      <div
        class="text-h6"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        "
      >
        No data
      </div>
    </v-card-item>
  </v-card>
</template>
