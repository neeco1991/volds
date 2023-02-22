<script setup lang="ts">
const render = (e: any) => console.log(e);
</script>

<template>
  <ol-mouseposition-control :render="render" />
</template>
