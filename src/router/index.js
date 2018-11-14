import Vue from 'vue'
import Router from 'vue-router'
import Myapp from '@/components/Myapp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Myapp',
      component: Myapp
    }
  ]
})
