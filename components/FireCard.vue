<script setup lang="ts">
import { Fire } from '~~/stores/fires';
import { useFires } from '~~/stores/fires';
import indicators from '~~/lib/indicators';
import { useTheme } from '~~/stores/theme';
import { useMap } from '~~/stores/map';
const fires = useFires();
const theme = useTheme();
const map = useMap();

const props = defineProps<{ data: Fire }>();

// green, darker yellow, red
const rankingColors = ['#4caf50', '#ffeb3b', '#f44336'];

const compare = async (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  fires.toggleCompare(props.data);
};

const selectFire = () => {
  if (props.data.selected) {
    props.data.selected = false;
  } else {
    props.data.selected = true;
  }
};

const fireClicked = () => {
  map.setCenter(props.data.effis_data.centroid.coordinates as [number, number]);
  map.setZoom(7);
};
</script>

<template>
  <v-card
    :style="`margin-bottom: 0.5rem; border-color: ${
      rankingColors[props.data.ranking]
    }; cursor: pointer;`"
    :class="`mx-auto ${theme.dark ? 'dark-card' : 'ligth-card'}`"
    max-width="344"
    variant="outlined"
    :loading="fires.isLoading"
    :onmouseenter="selectFire"
    :onmouseleave="selectFire"
    @click="fireClicked"
  >
    <v-card-item>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div>
          <div class="text-overline">
            {{ props.data.effis_data.iso2 || '--' }}
          </div>
          <div class="text-h6">
            {{
              props.data.effis_data.admlvl3 ||
              props.data.effis_data.country ||
              'Unknown'
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

    <v-card-actions
      style="width: 100%; display: flex; justify-content: space-between"
    >
      <div>
        <v-btn
          size="small"
          variant="outlined"
          :color="fires.isCompared(data.id) ? 'error' : ''"
          @click="(e: any) => compare(e)"
          :disabled="fires.isLoading"
        >
          {{ fires.isCompared(data.id) ? 'Remove &rarr;' : '&larr; Details' }}
        </v-btn>
      </div>

      <div style="display: flex">
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="indicators.info('people', data.indicators.people).color"
            icon="mdi-account-multiple"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >People:
            {{
              indicators.info('people', data.indicators.people).text
            }}</v-tooltip
          >
        </div>
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="
              indicators.info(
                'infrastructures',
                data.indicators.infrastructures
              ).color
            "
            icon="mdi-domain"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Infrastructures:
            {{
              indicators.info(
                'infrastructures',
                data.indicators.infrastructures
              ).text
            }}</v-tooltip
          >
        </div>
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="
              indicators.info('protected', data.indicators.protected).color
            "
            icon="mdi-pine-tree"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Protected areas:
            {{
              indicators.info('protected', data.indicators.protected).text
            }}</v-tooltip
          >
        </div>
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="indicators.info('size', data.indicators.size).color"
            icon="mdi-fire"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Fire size:
            {{ indicators.info('size', data.indicators.size).text }}</v-tooltip
          >
        </div>
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="indicators.info('upland', data.indicators.upland).color"
            icon="mdi-terrain"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Terrain:
            {{
              indicators.info('upland', data.indicators.upland).text
            }}</v-tooltip
          >
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card.ligth-card:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.v-card.dark-card:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
