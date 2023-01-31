export const useMap = defineStore('map', {
  state: () => ({
    url: '',
  }),
  getters: {
    getUrl: ({ url }) => url,
  },
  actions: {
    setUrl(url: string) {
      this.url = url;
    },
  },
});
