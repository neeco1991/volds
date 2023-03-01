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
      const center = query.center;
      const zoom = query.zoom;

      if (center) {
        const centerArr = (center as string).split(',');
        if (centerArr.length === 2) {
          this.setCenter([parseFloat(centerArr[0]), parseFloat(centerArr[1])]);
        }
      }

      if (zoom) {
        this.zoom = +zoom;
      }

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
      this.pushOnQps();
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
          center: this.center.join(','),
          zoom: this.zoom,
        },
      });
    },
  },
});
