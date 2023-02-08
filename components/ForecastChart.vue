<script setup lang="ts">
import { Fire } from '~~/stores/fires';

interface Props {
  data: Fire;
}

const props = defineProps<Props>();

const getPerimeter = () => {
  if (!dss_data[forecastIndex.value]) {
    return [[[[0, 0]]]];
  }
  return dss_data[forecastIndex.value].shape.coordinates;
};
const dss_data = props.data.dss_data.slice(12);
const center = props.data.effis_data.centroid.coordinates as [number, number];

const forecastIndex = ref<number>(0);

const perimeter = ref(getPerimeter());

const increment = (value: number) => {
  forecastIndex.value += value;
  if (forecastIndex.value < 0) {
    forecastIndex.value = 0;
    return;
  }
  if (forecastIndex.value > dss_data.length - 1) {
    forecastIndex.value = dss_data.length - 1;
    return;
  }
  perimeter.value = getPerimeter();
};
</script>

<template>
  <div
    v-if="dss_data.length > 1"
    style="display: flex; flex-direction: column; height: 100%"
  >
    <div style="flex-grow: 1">
      <PerimeterChart
        :center="center"
        :perimeter="perimeter"
        :loading="false"
        :error="false"
      ></PerimeterChart>
    </div>
    <div class="controls">
      <v-btn variant="outlined" @click="increment(-1)">&larr;</v-btn>
      <p>{{ forecastIndex + 1 }} / {{ dss_data.length }}</p>
      <v-btn variant="outlined" @click="increment(1)">&rarr;</v-btn>
    </div>
    <div class="forecast-table">
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
  <NoData v-else></NoData>
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
