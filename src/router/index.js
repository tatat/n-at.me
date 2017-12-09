import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index'
import Illustration from '@/components/Illustration'
import NotFound from '@/components/NotFound'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/',
      name: 'index',
      component: Index
    },
    { path: '/i/:id:ext(\\.html)?',
      name: 'illustration',
      component: Illustration
    },
    { path: '*',
      name: 'not_found',
      component: NotFound
    }
  ]
})