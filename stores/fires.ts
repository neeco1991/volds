const BASE_URL = `https://api.wild-fire.eu/rest/firespread/forecast/`;
// ?finaldate__gte=2022-09-21&finaldate__lte=2022-10-27&area__gte=30&ordering=-initialdate

export const useFires = defineStore('fires', {
  state: () => ({
    active: false,
    loading: false,
    list: [] as Fire[],
    count: 0,
    error: null as string | null,
    lastFetch: ['', '', 0] as [string, string, number],
  }),
  getters: {
    isActive: ({ active }) => active,
    isLoading: ({ loading }) => loading,
    getLastFetch: ({ lastFetch }) => lastFetch,
    getList: ({ list }) => list,
  },
  actions: {
    toggleActive() {
      this.active = !this.active;
    },
    setActive(target: boolean) {
      this.active = target;
    },
    setLastFetch(from: string, to: string, area: number) {
      this.lastFetch = [from, to, area];
    },
    async fetchList(from = '2022-09-21', to = '2022-10-27', area = 30) {
      this.loading = true;
      const url = `${BASE_URL}?finaldate__gte=${from}&finaldate__lte=${to}&area__gte=${area}&ordering=-initialdate`;
      const response = await fetch(url);
      const data = (await response.json()) as Response;

      if (!response.ok) {
        this.error = response.statusText;
        this.loading = false;
        return;
      }

      this.error = null;
      this.list = data.results;
      this.count = data.count;

      this.loading = false;
    },
  },
});

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Fire[];
}

interface Fire {
  date: string;
  dss_date: any[];
  effis_data: EffisData;
  fire_id: number;
  id: number;
  indicators: Indicator;
  ranking: number;
  updated: string;
}

interface EffisData {
  admlvl1: string;
  admlvl2: string;
  admlvl3: string;
  admlvl4: string;
  agricolture_percent: number;
  area: number;
  artificial_percent: number;
  bbox: [number, number, number, number];
  broadleaved_forest_percent: number;
  centroid: Shape;
  coniferous_forest_percent: number;
  country: string;
  filldate: string;
  id: number;
  initialdate: string;
  iso2: string;
  iso3: string;
  mixed_forest_percent: number;
  natura2k_percent: number;
  other_natural_percent: number;
  other_percent: number;
  slerophillous_vegetation_percent: number;
  shape: Shape;
  transitional_vegetation_percent: number;
  updated: string;
}

interface Shape {
  type: string;
  coordinates: any[];
}

interface Indicator {
  infrastructure: number;
  people: number;
  protected: number;
  size: number;
  upland: number;
}
