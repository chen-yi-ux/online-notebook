import Vue from 'vue'
import Vuex from 'vuex'
import notebook from "./modules/notebook"
import note from "./modules/note"
import user from "./modules/user"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    notebook,
    note,
    user
  }
})

export default store;
