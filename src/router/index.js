import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/Login'),
      alias: '/login'
    },
    {
      path: '/notebooks',
      component: () => import('@/components/Notebooks')
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
