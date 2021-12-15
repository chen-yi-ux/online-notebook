import Vue from 'vue'
import Vuex from 'vuex'
import notebook from "./modules/notebook"
import note from "./modules/note"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    notebook,
    note
  }
})

export default store;
