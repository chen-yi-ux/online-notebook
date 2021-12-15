import Vue from 'vue'
import Vuex from 'vuex'
import notebook from "./modules/notebook"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    notebook
  }
})

export default store;
