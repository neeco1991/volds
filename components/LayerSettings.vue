<script setup lang="ts">
import { useLayers, LayerWithProps } from '~~/stores/layers';
import { useTheme } from '~~/stores/theme';
const props = defineProps<{ layer: LayerWithProps }>();

const layers = useLayers();
const theme = useTheme();
const opacity = ref(props.layer.opacity);

const isSettingsOpen = ref(false);
const toggleOpen = () => {
  isSettingsOpen.value = !isSettingsOpen.value;
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
  </div>
</template>
