<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import OverlayItem from './OverlayItem.vue';
import Tile from './Tile.vue';
import Marker from './Marker.vue';
import { useTheme } from '../stores/theme';
import { useSettings } from '../stores/settings';
import { useMap } from '~~/stores/map';
import { useFires } from '~~/stores/fires';
import { Layer, useLayers } from '~~/stores/layers';

export interface SimpleOverlayType {
  title: string;
  position: [number, number];
}

export interface MapType {
  url: string;
  title: string;
  id: string;
}

export interface MarkerType {
  position: [number, number];
  title: string;
}

type Props = {
  data: {
    types?: MapType[];
    overlays?: SimpleOverlayType[];
    tiles?: Layer[];
    markers?: MarkerType[];
    activeFireSelector?: boolean;
  };
};

const props = defineProps<Props>();

const theme = useTheme();
const router = useRouter();
const settings = useSettings();
const map = useMap();
const fires = useFires();
const layers = useLayers();

const overlays = ref(
  (props.data.overlays || []).map((element: SimpleOverlayType) => ({
    ...element,
    active: false,
  }))
);

const markers = ref(
  (props.data.markers || []).map((element: MarkerType) => ({
    ...element,
    active: false,
  }))
);

const types = ref(
  (props.data.types || []).map((element: MapType) => ({
    ...element,
    active: false,
  }))
);

const checkMove = (e: any) => {
  layers.reorder();
};

const mapUrl = ref('');

const setMapType = (type: MapType) => {
  map.setType(type);
  mapUrl.value = type.url;
  const query = router.currentRoute.value.query;

  router.push({ query: { ...query, type: type.id } });
};

const closeSettings = () => {
  settings.toggleActive();
};

onMounted(() => {
  const query = router.currentRoute.value.query;
  const { type } = query;
  if (type) {
    setMapType(
      types.value.find((element) => element.id === type) || types.value[0]
    );
  } else {
    setMapType(types.value[0]);
  }
});
</script>

<template>
  <div id="panel">
    <v-card
      v-if="settings.active"
      class="mx-auto rounded-t-lg rounded-b-0"
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
            <v-icon color="#ada6a2" icon="mdi-cog"></v-icon>
            <p style="margin-left: 1rem">Settings and layers</p>
          </div>
          <v-btn
            icon
            border="none"
            variant="flat"
            color="transparent"
            @click="closeSettings()"
          >
            <v-icon icon="mdi-close" size="x-large"></v-icon>
          </v-btn>
        </div>
      </template>
    </v-card>

    <v-expansion-panels class="rounded-t-0" v-if="settings.active" multiple>
      <v-expansion-panel
        class="rounded-t-0"
        v-if="types.length"
        :bg-color="theme.primary"
      >
        <v-expansion-panel-title>Map type</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-radio-group hide-details v-model="mapUrl">
            <v-radio
              v-for="type in types"
              :key="type.title"
              :label="type.title"
              :value="type.url"
              @click="setMapType(type)"
            ></v-radio>
          </v-radio-group>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="overlays.length" :bg-color="theme.primary">
        <v-expansion-panel-title>Overlays</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-switch
            v-for="overlay in overlays"
            :label="`${overlay.title}`"
            v-model="overlay.active"
          ></v-switch>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="layers.list.length" :bg-color="theme.primary">
        <v-expansion-panel-title>Layers</v-expansion-panel-title>
        <v-expansion-panel-text>
          <!-- <div v-for="layer in layers.list"> -->
          <draggable
            item-key="title"
            class="list-group"
            v-model="layers.list"
            @end="checkMove"
          >
            <!-- <div class="list-group-item">{{ element.title }}</div> -->
            <template #item="{ element }">
              <div
                v-if="element.id !== 'fwi'"
                style="display: flex; align-items: center"
              >
                <div style="flex: 1">
                  <LayerSettings :layer="element"></LayerSettings>
                </div>
                <v-icon
                  icon="mdi-drag-horizontal-variant"
                  size="x-large"
                  :color="theme.secondary"
                  style="cursor: grab"
                ></v-icon>
              </div>
            </template>
          </draggable>
          <!-- </div> -->
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="markers.length" :bg-color="theme.primary">
        <v-expansion-panel-title>Markeres</v-expansion-panel-title>
        <v-expansion-panel-text
          ><v-switch
            v-for="marker in markers"
            :label="`${marker.title}`"
            v-model="marker.active"
          ></v-switch
        ></v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel
        v-if="data.activeFireSelector"
        :bg-color="theme.primary"
      >
        <v-expansion-panel-title>Burnt areas</v-expansion-panel-title>
        <v-expansion-panel-text>
          <ActiveFires></ActiveFires>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div v-for="fire in fires.getList">
      <Marker
        v-if="fires.active"
        :key="fire.id.toString()"
        :position="fire.effis_data.centroid.coordinates as [number, number]"
        :id="fire.id.toString()"
      ></Marker>
    </div>

    <div v-for="(overlay, index) in overlays">
      <OverlayItem
        v-if="overlay.active"
        :key="index.toString()"
        :title="overlay.title"
        :position="overlay.position"
      ></OverlayItem>
    </div>

    <Tile v-for="layer in layers.getActives" :data="layer"></Tile>
  </div>
</template>

<style scoped>
#panel {
  width: 400px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  border-radius: inherit;
  z-index: 1000;
}

#panel::-webkit-scrollbar {
  display: none;
}
</style>
