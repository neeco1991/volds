<script setup lang="ts">
interface Item {
  title: string;
  disabled?: boolean;
  href?: string;
}

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
</script>

<template>
  <v-card
    color="grey-lighten-4"
    elevated
    min-height="4rem"
    rounded="0"
    style="display: flex; justify-content: center"
  >
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  </v-card>
</template>
