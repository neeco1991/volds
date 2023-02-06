<script setup lang="ts">
const props = defineProps<{
  coordinates: [number, number];
  from: string;
  to: string;
}>();

const loaded = ref(false);
const chartData = ref<any>(null);
const error = ref<boolean>(false);

onMounted(async () => {
  loaded.value = false;

  try {
    const fromDate = new Date(props.from);
    fromDate.setDate(fromDate.getDate() - 2);
    const from = fromDate.toISOString().split('T')[0];
    const toDate = new Date(props.to);
    toDate.setDate(toDate.getDate() + 4);
    const to = toDate.toISOString().split('T')[0];

    const response = await fetch(
      `https://api.wild-fire.eu/rest/2/burntareas/charts/wms?model=ecmwf&day_gte=${from}&day_lte=${to}&point=(${props.coordinates[0]}%20${props.coordinates[1]})`
    );

    const data = await response.json();

    chartData.value = {
      labels: data.x_data.map((x: string) => {
        const date = new Date(x);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          label: 'FWI',
          backgroundColor: '#f87979',
          data: data.y_data.fwi,
        },
      ],
    };

    loaded.value = true;
    error.value = false;
  } catch (e) {
    loaded.value = true;
    error.value = true;
  }
});
</script>

<template>
  <LineChart :loaded="loaded" :error="error" :data="chartData"></LineChart>
</template>
