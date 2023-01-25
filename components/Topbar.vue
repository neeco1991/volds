<script setup lang="ts">
import { useTheme } from '../stores/theme';

interface Item {
  title: string;
  disabled?: boolean;
  href?: string;
}

const theme = useTheme();

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
</script>

<template>
  <v-card
    :color="theme.primary"
    elevated
    min-height="4rem"
    rounded="0"
    style="position: relative"
  >
    <v-breadcrumbs
      style="display: flex; justify-content: center"
      :items="items"
    >
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <!-- div positioned at the center right -->
    <div
      style="
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
      "
    >
      <v-btn
        icon
        border="none"
        variant="flat"
        color="transparent"
        @click="changeTheme()"
      >
        <v-icon icon="mdi-brightness-6"></v-icon>
      </v-btn>
    </div>
  </v-card>
</template>
