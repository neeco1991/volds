<script setup lang="ts">
import { useFires } from '~~/stores/fires';
import { DatePicker } from 'v-calendar';
import { useTheme } from '~~/stores/theme';

const fires = useFires();
const router = useRouter();
const theme = useTheme();

const date = ref<{ start: Date; end: Date }>({
  start: new Date(new Date().setDate(new Date().getDate() - 7)),
  end: new Date(),
});

let area = ref<number>(30);

const showFires = () => {
  fires.toggleActive();

  if (fires.isActive) {
    fires.fetchList(
      date.value.start.toISOString().slice(0, 10),
      date.value.end.toISOString().slice(0, 10),
      area.value
    );
  }

  updateQueryParams();
};

onMounted(() => {
  const { query } = router.currentRoute.value;

  if (query.firesFrom && query.firesTo) {
    date.value.start = new Date(query.firesFrom as string);
    date.value.end = new Date(query.firesTo as string);
  }

  if (query.firesArea) {
    area.value = Number(query.firesArea);
  }
});

const updateQueryParams = () => {
  const { query } = router.currentRoute.value;

  const firesFrom = date.value.start.toISOString().slice(0, 10);
  const firesTo = date.value.end.toISOString().slice(0, 10);
  const firesArea = area.value;

  if (
    fires.isActive &&
    (firesFrom !== query.firesFrom ||
      firesTo !== query.firesTo ||
      firesArea !== Number(query.firesArea))
  ) {
    fires.fetchList(firesFrom, firesTo, firesArea);
  }

  router.push({
    query: {
      ...query,
      fires: fires.isActive.toString(),
      firesFrom,
      firesTo,
      firesArea,
    },
  });
};
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
    @click.stop="updateQueryParams()"
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
    @click.stop="updateQueryParams()"
  ></v-slider>
</template>
