import Vue from 'vue'
import Router from 'vue-router'
import pro from '@/page/pro4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pro',
      component: pro
    }
  ]
})
