<script setup lang="ts">
import { Fire, useFires } from '~~/stores/fires';
import { useTheme } from '~~/stores/theme';

const props = defineProps<{ data: Fire }>();
const theme = useTheme();
const fires = useFires();
</script>

<template>
  <div id="compared-fire">
    <v-card class="mx-auto rounded-t-lg" :color="theme.primary">
      <template v-slot:title>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div style="display: flex; align-items: center">
            <v-icon icon="mdi-fire"></v-icon>
            <p style="margin-left: 1rem">Fire {{ data.id }}</p>
          </div>
          <v-btn
            icon
            border="none"
            variant="flat"
            color="transparent"
            @click="() => fires.toggleCompare(data)"
          >
            <v-icon icon="mdi-close" size="x-large"></v-icon>
          </v-btn>
        </div>
      </template>
    </v-card>
  </div>
</template>

<style scoped>
#compared-fire {
  width: 400px;
  min-width: 400px;
  border-radius: 4px;
  z-index: 1000;
  margin-right: 1rem;
}
</style>
