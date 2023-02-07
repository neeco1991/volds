<script setup lang="ts">
import { Fire } from '~~/stores/fires';

interface Props {
  data: Fire | null;
  loading: boolean;
  error: boolean;
}

const center = ref<[number, number]>([0, 0]);
const perimeter = ref([[[[0, 0]]]]);
const dss_data = ref<any[]>([]);
const forecastIndex = ref<number>(0);

const props = defineProps<Props>();

watch(
  () => props.data,
  (data) => {
    if (data && data.dss_data.length > 1) {
      dss_data.value = data?.dss_data.slice(12);
      center.value = data.effis_data.centroid.coordinates as [number, number];
      perimeter.value = getPerimeter();
    }
  }
);

const getPerimeter = () => {
  return dss_data.value[forecastIndex.value].shape.coordinates;
};

const increment = (value: number) => {
  forecastIndex.value += value;
  if (forecastIndex.value < 0) {
    forecastIndex.value = 0;
    return;
  }
  if (forecastIndex.value > dss_data.value.length - 1) {
    forecastIndex.value = dss_data.value.length - 1;
    return;
  }
  perimeter.value = getPerimeter();
};
</script>

<template>
  <div
    v-if="!loading && !error && dss_data.length > 1"
    style="display: flex; flex-direction: column; height: 100%"
  >
    <div style="flex-grow: 1">
      <PerimeterChart
        :center="center"
        :perimeter="perimeter"
        :loading="loading"
        :error="error"
      ></PerimeterChart>
    </div>
    <div v-if="!loading && !error" class="controls">
      <v-btn variant="outlined" @click="increment(-1)">&larr;</v-btn>
      <p>{{ forecastIndex + 1 }} / {{ dss_data.length }}</p>
      <v-btn variant="outlined" @click="increment(1)">&rarr;</v-btn>
    </div>
    <div v-if="!loading && !error" class="forecast-table">
      <div class="forecast-table__row">
        <b>Forecast time</b>
        <p>
          {{ dss_data[forecastIndex].date.slice(0, 10) }}
          {{ dss_data[forecastIndex].forecast.Hour }}
        </p>
      </div>
      <div class="forecast-table__row">
        <b>Perimeter length</b>
        <p>{{ dss_data[forecastIndex].perimeter.toString() }} km</p>
      </div>
      <div class="forecast-table__row">
        <b>Population</b>
        <p>
          {{ dss_data[forecastIndex].forecast.pop_total }}
        </p>
      </div>
      <div class="forecast-table__row">
        <b>Built up area</b>
        <p>
          {{ dss_data[forecastIndex].forecast.built_up_area }} m<sup>2</sup>
        </p>
      </div>
    </div>
  </div>
  <v-card
    v-else-if="!loading && !error"
    color="grey lighten-4"
    style="
      height: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <v-card-item class="text-h6"> No data </v-card-item>
  </v-card>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 1rem;
}

.forecast-table {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}

.forecast-table__row {
  display: flex;
  justify-content: space-between;
}
</style>
