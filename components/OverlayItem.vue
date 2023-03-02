<script setup lang="ts">
import { Fire } from '~~/stores/fires';
import { useTheme } from '~~/stores/theme';
const theme = useTheme();
const props = defineProps<{
  fire: Fire;
  style?: {
    backgroud: string;
    boxShadow: string;
    padding: string;
    fontSize: string;
  };
}>();
</script>

<template>
  <ol-overlay :position="props.fire.effis_data.centroid.coordinates">
    <template v-slot="slotProps">
      <div
        :class="`overlay-content ${theme.dark ? 'theme-black' : 'theme-white'}`"
      >
        <FireCard :data="props.fire"></FireCard>
      </div>
    </template>
  </ol-overlay>
</template>

<style scoped>
.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 5px 1px 1px 1px;
  font-size: '16px';
  width: 360px;
  border-radius: 5px;
}

.theme-black {
  background-color: #212121;
  color: white;
}
.theme-white {
  background-color: white;
  color: black;
}
</style>
