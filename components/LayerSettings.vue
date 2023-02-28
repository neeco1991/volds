<script setup lang="ts">
import { useFires } from '~~/stores/fires';
import { useLayers, LayerWithProps } from '~~/stores/layers';
import { useTheme } from '~~/stores/theme';
const props = defineProps<{ layer: LayerWithProps; dateSelector?: boolean }>();

const layers = useLayers();
const theme = useTheme();
const fires = useFires();
const opacity = ref(props.layer.opacity);

const dates = ref<string[]>([]);
const unsubscribe = ref<() => void>(() => {
  return;
});
const dateSliderValue = ref<number>(0);
const selectedDate = ref<string>('');

const isSettingsOpen = ref(false);
const toggleOpen = () => {
  isSettingsOpen.value = !isSettingsOpen.value;
};

onMounted(() => {
  if (props.dateSelector) {
    unsubscribe.value = fires.$onAction(
      ({
        name, // name of the action
        store, // store instance, same as `someStore`
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError, // hook if the action throws or rejects
      }) => {
        if (name === 'setDates') {
          const firesTo = new Date(args[1]);

          if (new Date(firesTo).toISOString().slice(0, 10) !== dates.value[0]) {
            fillDates(firesTo);
          }
        }
      }
    );

    fillDates(fires.getFiresTo);
  }
});

onUnmounted(() => {
  if (props.dateSelector) {
    unsubscribe.value();
  }
});

const fillDates = (startingDate: Date) => {
  dates.value = [];
  const start = new Date(startingDate);
  dates.value.push(start.toISOString().slice(0, 10));

  // push the next 5 days
  for (let i = 1; i < 5; i++) {
    const date = new Date(start.setDate(start.getDate() + 1));
    dates.value.push(date.toISOString().slice(0, 10));
  }

  selectedDate.value = dates.value[0];

  if (props.layer.time) {
    selectedDate.value =
      dates.value.indexOf(props.layer.time) > -1
        ? props.layer.time
        : dates.value[0];

    dateSliderValue.value = dates.value.indexOf(selectedDate.value);
  }
};

const setDate = (e: any) => {
  e.preventDefault();

  selectedDate.value = dates.value[dateSliderValue.value];

  layers.setDate(props.layer, selectedDate.value);
};
</script>

<template>
  <div
    style="display: flex; justify-content: space-between; align-items: center"
  >
    <v-switch
      :label="`${props.layer.title}`"
      v-model="props.layer.active"
      hide-details
      @click="layers.toggleActive(props.layer)"
    >
    </v-switch>
    <v-btn
      icon
      color="transparent"
      border="none"
      variant="flat"
      @click="toggleOpen()"
    >
      <v-icon
        :color="isSettingsOpen ? '#ada6a2' : theme.isDark ? 'white' : 'black'"
        icon="mdi-cog"
        size="x-large"
      ></v-icon>
    </v-btn>
  </div>
  <div v-if="isSettingsOpen">
    <div style="display: flex; justify-content: space-between">
      <p>Opacity:</p>
      <p>{{ opacity }}</p>
    </div>
    <v-slider
      v-model="opacity"
      :max="1"
      :min="0"
      :step="0.1"
      :thumb-size="0"
      :color="theme.isDark ? 'white' : 'black'"
      hide-details
      @click.stop="layers.setOpacity(props.layer, opacity)"
    ></v-slider>

    <div v-if="props.dateSelector">
      <div style="display: flex; justify-content: space-between">
        <p>Date:</p>
        <p>
          {{ selectedDate }}
        </p>
      </div>
      <v-slider
        v-model="dateSliderValue"
        :min="0"
        :max="dates.length - 1"
        :step="1"
        :thumb-size="0"
        :color="theme.isDark ? 'white' : 'black'"
        hide-details
        @click.stop="setDate($event)"
      ></v-slider>
    </div>
  </div>
</template>
