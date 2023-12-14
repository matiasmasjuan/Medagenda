import './assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
if (userFromLocalStorage) {
  store.dispatch('setUser', userFromLocalStorage)
}

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
