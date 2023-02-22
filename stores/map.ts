export const useMap = defineStore('map', {
  state: () => ({
    url: '',
    id: '',
    center: [10, 47] as [number, number],
    zoom: 6 as number,
  }),
  getters: {
    getUrl: ({ url }) => url,
  },
  actions: {
    async init(types: { url: string; id: string }[]) {
      const { query } = await this.router.currentRoute.value;
      const type = query.type;
      if (type) {
        const typeObj = types.find((t) => t.id === type);
        if (typeObj) {
          this.setType(typeObj);
          return;
        }
      }

      this.setType(types[0]);
    },
    setCenter(value: [number, number]) {
      this.center = value;
    },
    setZoom(value: number) {
      this.zoom = value;
    },
    setType(type: { url: string; id: string }) {
      this.url = type.url;
      this.id = type.id;
      this.pushOnQps();
    },
    async pushOnQps() {
      const { query } = await this.router.currentRoute.value;
      this.router.push({
        query: {
          ...query,
          type: this.id,
        },
      });
    },
  },
});
