import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
