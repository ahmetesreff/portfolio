import { createApp } from 'vue'
import router from './router'
import i18n from './i18n'
import './assets/styles/variables.css'
import './assets/styles/reset.css'
import './assets/styles/main.css'
import App from './App.vue'

// Directives
import { vScrollReveal } from './directives/scrollReveal'
import { vParallax } from './directives/parallax'

const app = createApp(App)

// Register global directives
app.directive('scroll-reveal', vScrollReveal)
app.directive('parallax', vParallax)

app.use(router)
app.use(i18n)
app.mount('#app')
