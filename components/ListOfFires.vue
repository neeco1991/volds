<script setup lang="ts">
import { useFires } from '~~/stores/fires';
import { useTheme } from '~~/stores/theme';
const fires = useFires();
const theme = useTheme();
</script>

<template>
  <div id="fires" v-if="fires.active">
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
            <v-icon color="#ff4000" icon="mdi-fire"></v-icon>
            <p style="margin-left: 1rem">List of fires</p>
          </div>
          <v-btn
            icon
            border="none"
            variant="flat"
            color="transparent"
            @click="() => fires.setActive(false)"
          >
            <v-icon icon="mdi-close" size="x-large"></v-icon>
          </v-btn>
        </div>
      </template>
    </v-card>
  </div>
</template>

<style scoped>
#fires {
  position: absolute;
  top: 2%;
  right: 1%;
  width: 400px;
  max-height: 96%;
  z-index: 1000;
}
</style>
