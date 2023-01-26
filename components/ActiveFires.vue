<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import { useFires } from '~~/stores/fires';
const fires = useFires();
const router = useRouter();
let switchActive = ref<boolean>(false);

const date = ref<[Date, Date]>([
  new Date(new Date().setDate(new Date().getDate() - 7)),
  new Date(),
]);

const showFires = () => {
  switchActive.value = !switchActive.value;
  console.log(switchActive.value);
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
  await fires.fetchList();
};
</script>

<template>
  <v-switch
    label="Show active fires"
    :model-value="switchActive"
    @click="showFires()"
  >
  </v-switch>

  <div
    style="
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    "
  >
    Select a date range
    <Datepicker v-model="date" range dark inline auto-apply> </Datepicker>
  </div>
</template>
