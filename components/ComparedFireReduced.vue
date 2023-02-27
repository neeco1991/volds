<script setup lang="ts">
import { Fire, useFires } from '~~/stores/fires';
import { useTheme } from '~~/stores/theme';
const fires = useFires();

const props = defineProps<{ data: Fire }>();
const theme = useTheme();
</script>

<template>
  <div id="compared-fire">
    <v-card
      style="width: 100%; z-index: 1000"
      class="mx-auto rounded-t-lg"
      :color="theme.primary"
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
            <v-icon icon="mdi-fire"></v-icon>
            <p style="margin-left: 1rem">Fire {{ data.id }}</p>
          </div>
          <div>
            <v-btn
              icon
              border="none"
              variant="flat"
              color="transparent"
              @click="() => fires.setCompareReduced(false)"
            >
              <v-icon icon="mdi-window-maximize" size="x-large"></v-icon>
            </v-btn>
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
        </div>
      </template>

      <v-card-item>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div>
            <div class="text-overline">{{ props.data.effis_data.iso2 }}</div>
            <div class="text-h6">
              {{
                props.data.effis_data.admlvl3 || props.data.effis_data.country
              }}
            </div>
          </div>
          <div style="text-align: right">
            <div class="text-caption">
              {{ props.data.date.split('T')[0] }}
            </div>
            <div class="text-caption">
              Fire size: {{ props.data.effis_data.area }} ha
            </div>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
#compared-fire {
  width: 400px;
  min-width: 400px;
  border-radius: 4px;
  margin-right: 1rem;
  display: flex;
  align-items: flex-end;
}
</style>
