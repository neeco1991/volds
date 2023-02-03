const BASE_URL = `https://api.wild-fire.eu/rest/firespread/forecast/`;

export const useFires = defineStore('fires', {
  state: () => ({
    active: false,
    loading: false,
    list: [] as Fire[],
    count: 0,
    error: null as string | null,
    compare: [] as Fire[],
    firesFrom: new Date(),
    firesTo: new Date(),
    firesArea: 30,
  }),
  getters: {
    isActive: ({ active }) => active,
    isLoading: ({ loading }) => loading,
    getList: ({ list }) => list,
    getCompare: ({ compare }) => compare,
    getFiresFrom: ({ firesFrom }) => firesFrom,
    getFiresTo: ({ firesTo }) => firesTo,
    getFiresArea: ({ firesArea }) => firesArea,
  },
  actions: {
    async init() {
      const { query } = this.router.currentRoute.value;
      this.active = query.active === 'true';
      this.firesFrom = query.firesFrom
        ? new Date(query.firesFrom as string)
        : new Date(new Date().setDate(new Date().getDate() - 7));
      this.firesTo = query.firesTo
        ? new Date(query.firesTo as string)
        : new Date();
      this.firesArea = query.firesArea
        ? parseInt(query.firesArea as string)
        : 30;
      await this.fetchList();
      let compare = query.compare;
      if (compare && !Array.isArray(compare)) {
        compare = [compare];
      }
      this.compare = this.list.filter((f) =>
        (query.compare || []).includes(f.id.toString())
      );
      this.pushOnQps();
    },
    isCompared(id: number) {
      return this.compare.findIndex((f) => f.id === id) !== -1;
    },
    setDates(from: Date, to: Date) {
      if (from !== this.firesFrom || to !== this.firesTo) {
        this.firesFrom = from;
        this.firesTo = to;
        this.pushOnQps();

        this.fetchList();
      }
    },
    setArea(area: number) {
      if (area !== this.firesArea) {
        this.firesArea = area;
        this.pushOnQps();

        this.fetchList();
      }
    },
    toggleActive() {
      this.active = !this.active;
      this.pushOnQps();
    },
    setActive(target: boolean) {
      this.active = target;
      this.pushOnQps();
    },
    toggleCompare(fire: Fire) {
      const index = this.compare.findIndex((f) => f.id === fire.id);
      if (index === -1) {
        this.compare.push(fire);
      } else {
        this.compare.splice(index, 1);
      }
      this.pushOnQps();
    },
    async fetchList() {
      this.loading = true;
      const from = this.firesFrom.toISOString().slice(0, 10);
      const to = this.firesTo.toISOString().slice(0, 10);
      const area = this.firesArea.toString();
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
    async pushOnQps() {
      const { query } = await this.router.currentRoute.value;
      this.router.push({
        query: {
          ...query,
          firesFrom: this.firesFrom.toISOString().slice(0, 10),
          firesTo: this.firesTo.toISOString().slice(0, 10),
          firesArea: this.firesArea,
          active: this.active.toString(),
          compare: this.compare.map((f) => f.id),
        },
      });
    },
  },
});

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Fire[];
}

export interface Fire {
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
  admlvl5: string;
  agricolture_percent: number;
  area: number;
  artificial_percent: number;
  bbox: [number, number, number, number];
  broadleaved_forest_percent: number;
  centroid: Shape;
  coniferous_forest_percent: number;
  country: string;
  finaldate: string;
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
  infrastructures: number;
  people: number;
  protected: number;
  size: number;
  upland: number;
}
