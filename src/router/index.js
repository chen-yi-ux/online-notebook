import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/components/Login'),
    },
    {
      path: '/',
      component: () => import('@/components/Notebooks'),
      alias: '/notebooks'
    },
    {
      path: '/note',
      component: () => import('@/components/NoteDetail')
    },
    {
      path: '/trash',
      component: () => import('@/components/TrashDetail')
    }
  ]
})
