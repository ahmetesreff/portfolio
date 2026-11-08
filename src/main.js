import { createApp } from 'vue'
import router from './router'
import i18n from './i18n'
import './assets/styles/fonts.css'
import './assets/styles/variables.css'
import './assets/styles/reset.css'
import './assets/styles/main.css'
import './assets/styles/terminal.css'
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
// İlk rota (tembel yüklenen sayfa bileşeni dahil) hazır olunca bağla; yoksa header/footer
// boş sayfayla çizilir, içerik gelince footer aşağı kayar (CLS ≈ 0,13).
router.isReady().then(() => app.mount('#app'))
