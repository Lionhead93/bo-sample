// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import modules from './modules'
import getters from './getters'

Vue.use(Vuex)
// Create a new store
const store = new Vuex.Store({
  getters,
  modules
})

export default store
