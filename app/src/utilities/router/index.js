import Vue from 'vue'
import Router from 'vue-router'

import home from './../../views/home.vue'
import bars from './../../views/bars.vue'
import register from './../../views/register.vue'
import login from './../../views/login.vue'
import _404 from './../../views/404.vue'

Vue.use(Router)

const router = new Router({
  base: '/Voting-App/',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: home
  }, {
    path: '/bars',
    component: polls
  }, {
    path: '/register',
    component: register
  }, {
    path: '/login',
    component: login
  }, {
    path: '/404',
    component: _404
  }, {
    path: '*',
    redirect: '/404'
  }]
})

export default router
