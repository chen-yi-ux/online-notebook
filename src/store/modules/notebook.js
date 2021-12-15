import Notebooks from "@/apis/notebooks"
import {Message} from "element-ui"

const state = {
  notebooks: null,
  curBookId: null
}

const getters = {
  notebooks: state => state.notebooks || [],
  curBook: state => {
    if(!Array.isArray(state.notebooks)){
      return {}
    }
    if(!state.curBookId){
      return state.notebooks[0] || {}
    }
    return state.notebooks.find(notebook => notebook.id === state.curBookId) || {}
  }
}

const mutations = {
  setNotebooks(state, payload){
    state.notebooks = payload.notebooks
  },
  setCurBook(state, payload){
    state.curBookId = payload.curBookId
  },
  addNotebook(state, payload){
    state.notebooks.unshift(payload.notebook)
  },
  updateNotebook(state, payload){
    let notebook = state.notebooks.find(notebook => notebook.id === payload.notebookId) || {}
    notebook.title = payload.title
  },
  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id !== payload.notebookId)
  }
}

const actions = {
  getNotebooks({commit, state}){
    if(state.notebooks !== null) return Promise.resolve()
    return Notebooks.getAll()
      .then(res =>{
        commit('setNotebooks', {notebooks: res.data})
      })
  },
  addNotebook({commit}, {title}){
    return Notebooks.addNotebook({title})
      .then(res => {
        commit('addNotebook', {notebook: res.data})
        Message.success(res.msg)
      })
  },
  updateNotebook({commit}, {notebookId, title}){
    return Notebooks.updateNotebook(notebookId, {title})
      .then(res => {
        commit('updateNotebook', {notebookId, title})
        Message.success(res.msg)
      })
  },
  deleteNotebook({commit}, {notebookId}){
    return Notebooks.deleteNotebook(notebookId)
      .then(res => {
        commit('deleteNotebook', {notebookId})
        Message.success(res.msg)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
