<script setup lang="ts">
import { useFires } from '~~/stores/fires';
import { DatePicker } from 'v-calendar';
import { useTheme } from '~~/stores/theme';
import { LayerWithProps, useLayers } from '~~/stores/layers';

const fires = useFires();
const theme = useTheme();
const layers = useLayers();

const date = ref<{ start: Date; end: Date }>({
  start: new Date(new Date().setDate(new Date().getDate() - 7)),
  end: new Date(),
});

let area = ref<number>(30);

let order = ref<string>('-initialdate');

const showFires = () => {
  fires.toggleActive();
};

const setDates = () => {
  fires.setDates(date.value.start, date.value.end);
};

const setArea = () => {
  fires.setArea(area.value);
};

const filter = (rank: number) => {
  fires.filter(rank);
};

watch(
  () => order.value as '-initialdate' | '-area',
  (value) => {
    fires.setOrderBy(value);
  }
);

onMounted(() => {
  date.value = {
    start: fires.getFiresFrom,
    end: fires.getFiresTo,
  };
  area.value = fires.getFiresArea;
});
</script>

<template>
  <v-switch
    label="Show active fires on map"
    :model-value="fires.active"
    @click="showFires()"
    :loading="fires.isLoading"
    hide-details
  >
  </v-switch>

  <div v-if="layers.getFwi" style="margin-bottom: 0.5rem">
    <LayerSettings :layer="layers.getFwi" :date-selector="true"></LayerSettings>
  </div>

  <p style="margin-bottom: 0.5rem">Select a date range:</p>
  <DatePicker
    :is-dark="theme.isDark"
    is-expanded
    is-range
    v-model="date"
    :max-date="new Date()"
    @click.stop="setDates()"
  ></DatePicker>

  <div
    style="display: flex; justify-content: space-between; align-items: baseline"
  >
    <p style="margin-top: 1rem">Select minimum fire size:</p>
    <p>{{ area.toString() }} ha</p>
  </div>
  <v-slider
    v-model="area"
    :min="0"
    :max="500"
    :step="1"
    :color="theme.isDark ? 'white' : 'black'"
    :thumb-size="0"
    @click.stop="setArea()"
  ></v-slider>

  <div
    style="display: flex; align-items: center; justify-content: space-between"
  >
    <p>Filter by fire ranking:</p>
    <div>
      <v-btn
        icon
        border="none"
        variant="flat"
        color="transparent"
        @click="filter(0)"
      >
        <v-icon
          :color="fires.isRankActive(0) ? '#4caf50' : '#132c14'"
          icon="mdi-fire"
        ></v-icon>
      </v-btn>
      <v-btn
        icon
        border="none"
        variant="flat"
        color="transparent"
        @click="filter(1)"
      >
        <v-icon
          :color="fires.isRankActive(1) ? '#ffeb3b' : '#4e4600'"
          icon="mdi-fire"
        ></v-icon>
      </v-btn>
      <v-btn
        icon
        border="none"
        variant="flat"
        color="transparent"
        @click="filter(2)"
      >
        <v-icon
          :color="fires.isRankActive(2) ? '#f44336' : '#470804'"
          icon="mdi-fire"
        ></v-icon>
      </v-btn>
    </div>
  </div>

  <div
    style="display: flex; align-items: center; justify-content: space-between"
  >
    <p>Order by:</p>
    <div>
      <v-radio-group hide-details v-model="order" inline>
        <v-radio label="Date" value="-initialdate"></v-radio>
        <v-radio label="Size" value="-area"></v-radio>
      </v-radio-group>
    </div>
  </div>
</template>
