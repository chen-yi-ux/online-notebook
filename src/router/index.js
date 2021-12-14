import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Notebooks from "@/components/Notebooks"
import NoteDetail from "@/components/NoteDetail"
import TrashDetail from "@/components/TrashDetail"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      alias: '/login'
    },
    {
      path: '/notebooks',
      component: Notebooks
    },
    {
      path: '/note',
      component: NoteDetail
    },
    {
      path: '/trash',
      component: TrashDetail
    }
  ]
})
