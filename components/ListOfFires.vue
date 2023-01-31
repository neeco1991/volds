<script setup lang="ts">
import { useFires } from '~~/stores/fires';
import { useTheme } from '~~/stores/theme';
const fires = useFires();
const theme = useTheme();
</script>

<template>
  <div id="fires" v-if="fires.active">
    <v-card
      class="mx-auto rounded-t-lg"
      :color="theme.primary"
      :loading="fires.isLoading"
    >
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

      <div style="margin-bottom: 1.6rem">
        <fire-card v-for="fire in fires.list" :data="fire"></fire-card>
      </div>
      <empty-fires v-if="fires.count === 0"></empty-fires>
    </v-card>
  </div>
</template>

<style scoped>
#fires {
  width: 400px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  border-radius: inherit;
  z-index: 1000;
}

#fires::-webkit-scrollbar {
  display: none;
}
</style>
