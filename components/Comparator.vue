<script setup lang="ts">
import { useFires } from '~~/stores/fires';
const fires = useFires();
</script>

<template>
  <div id="comparator">
    <div id="scroller">
      <ComparedFire
        v-for="fire in fires.compare"
        :data="fire"
        :key="fire.id.toString()"
      ></ComparedFire>
    </div>
  </div>
</template>

<style scoped>
#comparator {
  border-radius: 4px;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  overflow: auto;
}

#scroller {
  width: 100%;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  overflow: scroll;
}

#scroller::-webkit-scrollbar {
  display: none;
}
</style>
