import './assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import DefaultView from './components/home/DefaultView'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
