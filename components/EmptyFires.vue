<script setup lang="ts">
import { useFires } from '~~/stores/fires';
const fires = useFires();
</script>

<template>
  <div
    v-if="!fires.isLoading"
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    "
  >
    <v-icon icon="mdi-alert"></v-icon>
    <p style="margin-left: 1rem">No fires found</p>
  </div>
</template>
