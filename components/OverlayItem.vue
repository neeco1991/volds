<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  position: [number, number];
  style?: {
    backgroud: string;
    boxShadow: string;
    padding: string;
    fontSize: string;
  };
}>();

const style = ref(
  props.style || {
    background: '#efefef',
    boxShadow: '0 5px 10px rgb(2 2 2 / 20%)',
    padding: '10px 20px',
    fontSize: '16px',
  }
);
</script>

<template>
  <ol-overlay :position="props.position">
    <template v-slot="slotProps">
      <div class="overlay-content">
        {{ props.title }}<br />
        Position: {{ slotProps.position }}
      </div>
    </template>
  </ol-overlay>
</template>

<style scoped>
.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: '16px';
}
</style>
