export const useTheme = defineStore('theme', {
  state: () => ({
    dark: true,
  }),
  getters: {
    isDark: (state) => state.dark,
    primary: ({ dark }) => (dark ? 'grey-darken-4' : 'grey-lighten-4'),
    secondary: ({ dark }) => (dark ? 'grey-darken-3' : 'grey-lighten-3'),
  },
  actions: {
    toggleDark() {
      this.dark = !this.dark;
    },
  },
});
