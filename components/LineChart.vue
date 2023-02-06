<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  loaded: boolean;
  error: boolean;
  data: any;
}>();
</script>

<template>
  <Line v-if="props.loaded && !props.error" :data="props.data" />
  <v-card
    v-else-if="loaded && error"
    color="error"
    class="w-full h-full mx-auto"
    max-width="344"
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
        Error loading data
      </div>
    </v-card-item>
  </v-card>
  <v-card
    :loading="true"
    v-else
    color="grey lighten-4"
    class="w-full h-full mx-auto"
    max-width="344"
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
        Loading data...
      </div>
    </v-card-item>
  </v-card>
</template>
