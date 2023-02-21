export const useLayers = defineStore('layers', {
  state: () => ({
    list: [] as LayerWithProps[],
    order: '',
  }),
  getters: {
    getList: ({ list }) =>
      list.map((el, index) => ({ ...el, zIndex: 1100 - index })),
    getActives: ({ list }) => {
      const filtered = list
        .filter(({ active }) => active)
        .map((el, index) => ({ ...el, zIndex: 1100 - index }));
      return [...filtered];
    },
  },
  actions: {
    async init(layers: Layer[]) {
      this.list = layers.map((layer) => ({
        ...layer,
        active: false,
        opacity: 1,
        zIndex: 1001,
      }));

      const query = await this.router.currentRoute.value.query;
      const tiles = query.tile;
      if (tiles) {
        const tilesArr = Array.isArray(tiles) ? tiles : [tiles];
        tilesArr.forEach((tile) => {
          const [id, opacity] = (tile as string).split('_');
          const layer = this.list.find((l) => l.id === id);
          if (layer) {
            layer.active = true;
            layer.opacity = parseFloat(opacity);
          }
        });
      }

      if (query.layersOrder) {
        this.order = query.layersOrder as string;

        const reoderedList: LayerWithProps[] = this.order
          .split(',')
          .map((id) => {
            const layer = this.list.find((l) => l.id === id) as LayerWithProps;
            return layer;
          });

        this.list = reoderedList;
      }
    },
    async toggleActive(layer: Layer) {
      this.list = this.list.map((l) => {
        if (l.id === layer.id) {
          l.active = !l.active;
        }
        return l;
      });

      await this.pushOnQps();
    },
    async pushOnQps() {
      const query = await this.router.currentRoute.value.query;

      const activeTiles = this.list
        .filter(({ active }) => active)
        .map(({ id, opacity }) => `${id}_${opacity.toFixed(1)}`);

      await this.router.push({
        query: {
          ...query,
          tile: activeTiles,
          ...(this.order && { layersOrder: this.order }),
        },
      });
    },
    async setOpacity(layer: Layer, opacity: number) {
      this.list = this.list.map((l) => {
        if (l.id === layer.id) {
          l.opacity = opacity;
        }
        return l;
      });

      await this.pushOnQps();
    },
    async reorder() {
      this.order = this.list.map(({ id }) => id).join(',');

      await this.pushOnQps();
    },
  },
});

export interface Layer {
  title: string;
  id: string;
  type: string;
  url: string;
  time: string;
  layers: string;
}

export interface LayerProps {
  active: boolean;
  opacity: number;
  zIndex: number;
}

export type LayerWithProps = Layer & LayerProps;
