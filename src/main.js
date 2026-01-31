import { createApp } from 'vue'
import router from './router'
import './assets/styles/variables.css'
import './assets/styles/reset.css'
import './assets/styles/main.css'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')
