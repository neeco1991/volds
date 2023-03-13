<script setup lang="ts">
import { useMap } from '~~/stores/map';
import { useFires } from '../stores/fires';
import { useSettings } from '../stores/settings';
import { useTheme } from '../stores/theme';

interface Item {
  title: string;
  disabled?: boolean;
  href?: string;
}

const theme = useTheme();
const settings = useSettings();
const fires = useFires();
const router = useRouter();
const map = useMap();

const items: Item[] = [
  {
    title: 'EC',
    href: 'https://ec.europa.eu',
  },
  {
    title: 'Copernicus',
    href: 'https://www.copernicus.eu',
  },
  {
    title: 'Emergencies',
    href: 'https://emergency.copernicus.eu',
  },
  {
    title: 'Fires',
    href: 'https://effis.jrc.ec.europa.eu',
  },
  {
    title: 'Decision Support System',
    href: '/',
  },
];

const changeTheme = () => {
  theme.toggleDark();
};

const toggleSettings = () => {
  settings.toggleActive();
};

const linkText = ref<string>('Copy link');

const home = () => {
  router.push('/');
  map.setCenter([10, 47]);
  map.setZoom(6);
};

const share = async () => {
  const link = window.location.href;
  await navigator.clipboard.writeText(link);

  linkText.value = 'Copied!';

  setTimeout(() => {
    linkText.value = 'Copy link';
  }, 2000);
};

const toggleFires = () => {
  const { query } = router.currentRoute.value;
  fires.toggleActive();

  router.push({
    query: {
      ...query,
      fires: fires.isActive.toString(),
    },
  });
};
</script>

<template>
  <v-card :color="theme.primary" elevated min-height="4rem" rounded="0">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.2rem;
      "
    >
      <div>
        <v-btn
          icon
          border="none"
          variant="flat"
          color="transparent"
          @click="home()"
        >
          <v-icon icon="mdi-home"></v-icon>
          <v-tooltip activator="parent" location="bottom">Center map</v-tooltip>
        </v-btn>
        <v-btn
          icon
          border="none"
          variant="flat"
          color="transparent"
          @click="share()"
        >
          <v-icon icon="mdi-share-variant"></v-icon>
          <v-tooltip activator="parent" location="bottom">{{
            linkText
          }}</v-tooltip>
        </v-btn>
      </div>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>

      <div>
        <v-btn
          icon
          border="none"
          variant="flat"
          color="transparent"
          @click="toggleSettings()"
        >
          <v-tooltip activator="parent" location="bottom">Settings</v-tooltip>

          <v-icon
            :color="settings.isActive ? '#ada6a2' : undefined"
            icon="mdi-cog"
          ></v-icon>
        </v-btn>

        <v-btn
          icon
          border="none"
          variant="flat"
          color="transparent"
          @click="toggleFires()"
        >
          <v-tooltip activator="parent" location="bottom"
            >List of fires</v-tooltip
          >

          <v-icon
            :color="fires.isActive ? '#ff4000' : undefined"
            icon="mdi-fire"
          ></v-icon>
        </v-btn>

        <v-btn
          icon
          border="none"
          variant="flat"
          color="transparent"
          @click="changeTheme()"
        >
          <v-tooltip activator="parent" location="bottom"
            >Change theme</v-tooltip
          >

          <v-icon icon="mdi-brightness-6"></v-icon>
        </v-btn>

        <Login></Login>
      </div>
    </div>
  </v-card>
</template>
