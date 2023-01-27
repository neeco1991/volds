<script setup lang="ts">
import { useFires } from '~~/stores/fires';
import { Calendar, DatePicker } from 'v-calendar';
import { useTheme } from '~~/stores/theme';

const fires = useFires();
const router = useRouter();
const theme = useTheme();
let switchActive = ref<boolean>(false);

const date = ref<{ start: Date; end: Date }>({
  start: new Date(new Date().setDate(new Date().getDate() - 7)),
  end: new Date(),
});

const area = ref<number>(30);

const showFires = () => {
  switchActive.value = !switchActive.value;
  if (switchActive.value) {
    fetchData();
  }

  const { query } = router.currentRoute.value;

  if (query.fires === undefined) {
    fires.setActive(true);
  }

  router.push({
    query: {
      ...query,
      fires: switchActive.value.toString(),
    },
  });
};

onMounted(() => {
  const { query } = router.currentRoute.value;
  if (query.fires === 'true') {
    switchActive.value = true;
    fetchData();
  }
});

const fetchData = async () => {
  const start = date.value.start.toISOString().split('T')[0];
  const end = date.value.end.toISOString().split('T')[0];
  if (
    fires.getLastFetch[0] === start &&
    fires.getLastFetch[1] === end &&
    fires.getLastFetch[2] === area.value
  ) {
    return;
  }
  await fires.fetchList(start, end, area.value);
  fires.setLastFetch(start, end, area.value);
};
</script>

<template>
  <v-switch
    label="Show active fires"
    :model-value="switchActive"
    @click="showFires()"
  >
  </v-switch>

  <p style="margin-bottom: 0.5rem">Select a date range:</p>
  <DatePicker
    :is-dark="theme.isDark"
    is-expanded
    is-range
    v-model="date"
    @click.stop="fetchData()"
  ></DatePicker>
</template>
