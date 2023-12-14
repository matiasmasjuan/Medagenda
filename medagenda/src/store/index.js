// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearUser(state) {
      state.user = null
      // Clear user from localStorage
      localStorage.removeItem('user')
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    clearUser({ commit }) {
      commit('clearUser')
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
})
