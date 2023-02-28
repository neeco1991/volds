<script setup lang="ts">
import { Fire, useFires } from '~~/stores/fires';
import { useTheme } from '~~/stores/theme';
const fires = useFires();
const theme = useTheme();
</script>

<template>
  <div id="fires" v-show="fires.active">
    <v-card
      class="mx-auto rounded-t-lg"
      style="height: 100%; display: flex; flex-direction: column"
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

        <v-divider></v-divider>
      </template>

      <div id="scroller">
        <fire-card v-for="fire in fires.list" :data="fire"></fire-card>
        <empty-fires v-if="fires.count === 0"></empty-fires>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
#fires {
  width: 400px;
  z-index: 1000;
}

#scroller {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  border-radius: inherit;
}

#scroller::-webkit-scrollbar {
  display: none;
}
</style>
