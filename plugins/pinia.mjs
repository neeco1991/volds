import { markRaw } from 'vue'
// adapt this based on where your router is
import { useRouter } from 'vue-router'

function routerPlugin({ store }) {
    const router = useRouter()
    store.router = markRaw(router)
}

export default defineNuxtPlugin(({ $pinia }) => {
    $pinia.use(routerPlugin)
})