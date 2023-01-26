export const useSettings = defineStore('settings', {
  state: () => ({
    active: true,
  }),
  getters: {
    isActive: (state) => state.active,
  },
  actions: {
    toggleActive() {
      this.active = !this.active;
    },
  },
});
