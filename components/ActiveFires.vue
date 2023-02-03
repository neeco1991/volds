<script setup lang="ts">
import { useFires } from '~~/stores/fires';
import { DatePicker } from 'v-calendar';
import { useTheme } from '~~/stores/theme';

const fires = useFires();
const theme = useTheme();

const date = ref<{ start: Date; end: Date }>({
  start: new Date(new Date().setDate(new Date().getDate() - 7)),
  end: new Date(),
});

let area = ref<number>(30);

const showFires = () => {
  fires.toggleActive();
};

const setDates = () => {
  fires.setDates(date.value.start, date.value.end);
};

const setArea = () => {
  fires.setArea(area.value);
};

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
    :model-value="fires.isActive"
    @click="showFires()"
  >
  </v-switch>

  <p style="margin-bottom: 0.5rem">Select a date range:</p>
  <DatePicker
    :is-dark="theme.isDark"
    is-expanded
    is-range
    v-model="date"
    @click.stop="setDates()"
  ></DatePicker>

  <div
    style="display: flex; justify-content: space-between; align-items: baseline"
  >
    <p style="margin-top: 1rem">Select minimum fire size:</p>
    <p>{{ area.toString() }} ht</p>
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
</template>
