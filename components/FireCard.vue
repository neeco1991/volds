<script setup lang="ts">
import { Fire } from '~~/stores/fires';
import { useFires } from '~~/stores/fires';
const fires = useFires();
const router = useRouter();

const props = defineProps<{ data: Fire }>();
const style = ref<string>('');

// green, darker yellow, red
const rankingColors = ['#4caf50', '#ffeb3b', '#f44336'];
const indicatorColors = ['', '#ffeb3b', '#f44336'];
const tooltips = {
  people: ['Not affected', 'May be affected in the next 24 hours', 'Affected'],
  infrastructures: [
    'Not affected',
    'May be affected in the next 24 hours',
    'Affected',
  ],
  protected: [
    'Not affected',
    'May be affected in the next 24 hours',
    'Affected',
  ],
  size: ['Less than 100 ha', 'Between 100 and 500 ha', 'More than 500 ha'],
  upland: ['Flat', 'Hilly', 'Mountainous'],
};

onMounted(() => {
  style.value = `margin-bottom: 0.5rem; border-color: ${
    rankingColors[props.data.ranking]
  }`;
});

const compare = async () => {
  fires.toggleCompare(props.data);
  const { query } = await router.currentRoute.value;

  const compare = fires.getCompare.map((fire) => fire.id.toString());

  router.push({
    query: {
      ...query,
      compare,
    },
  });
};
</script>

<template>
  <v-card
    :style="style"
    class="mx-auto"
    max-width="344"
    variant="outlined"
    :loading="fires.isLoading"
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
          <div class="text-overline">{{ props.data.effis_data.iso2 }}</div>
          <div class="text-h6">
            {{ props.data.effis_data.admlvl3 || props.data.effis_data.country }}
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
        <v-btn size="small" variant="outlined" @click="compare()">
          {{ '&larr; Compare' }}
        </v-btn>
      </div>

      <div style="display: flex">
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="indicatorColors[data.indicators.people]"
            icon="mdi-account-multiple"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >People: {{ tooltips.people[data.indicators.people] }}</v-tooltip
          >
        </div>
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="indicatorColors[data.indicators.infrastructures]"
            icon="mdi-domain"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Infrastructures:
            {{
              tooltips.infrastructures[data.indicators.infrastructures]
            }}</v-tooltip
          >
        </div>
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="indicatorColors[data.indicators.protected]"
            icon="mdi-pine-tree"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Protected areas:
            {{ tooltips.protected[data.indicators.protected] }}</v-tooltip
          >
        </div>
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="indicatorColors[data.indicators.size]"
            icon="mdi-fire"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Fire size: {{ tooltips.size[data.indicators.size] }}</v-tooltip
          >
        </div>
        <div>
          <v-icon
            style="margin-right: 0.5rem"
            :color="indicatorColors[data.indicators.upland]"
            icon="mdi-terrain"
          ></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Terrain: {{ tooltips.upland[data.indicators.upland] }}</v-tooltip
          >
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>
