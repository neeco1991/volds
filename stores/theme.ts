export const useTheme = defineStore('theme', {
  state: () => ({
    dark: false,
  }),
  getters: {
    isDark: (state) => state.dark,
    primary: ({ dark }) => (dark ? 'grey-darken-4' : 'grey-lighten-4'),
  },
  actions: {
    toggleDark() {
      this.dark = !this.dark;
    },
  },
});
