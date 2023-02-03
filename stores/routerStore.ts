export {};
// import { defineStore } from 'pinia';

// export const useRouterStore = defineStore('routerStore', {
//   state: () => ({
//     qps: {} as Record<string, string | string[]>,
//   }),
//   getters: {
//     params: ({ qps }) => qps,
//   },
//   actions: {
//     get(param: string) {
//       return this.qps[param];
//     },
//     set(param: string, value: string) {
//       this.qps[param] = value;
//       console.log(this);
//       const { query } = await this.router.currentRoute.value;
//       console.log(query);
//       this.router.push({ query: this.qps });
//     },
//     toggle(param: string, value: string) {
//       let prevValue = this.qps[param] || [];
//       if (!Array.isArray(prevValue)) {
//         prevValue = [prevValue];
//       }
//       const index = prevValue.indexOf(value);
//       if (index === -1) {
//         this.qps[param] = [...prevValue, value];
//       } else {
//         prevValue.splice(index, 1);
//         this.qps[param] = prevValue;
//       }
//       this.router.push({ query: this.qps });
//     },
//     add(param: string, value: string) {
//       let prevValue = this.qps[param] || [];
//       if (!Array.isArray(prevValue)) {
//         prevValue = [prevValue];
//       }
//       this.qps[param] = [...prevValue, value];
//       this.router.push({ query: this.qps });
//     },
//   },
// });
