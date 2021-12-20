import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminPage')
  },
  {
    path: '/main',
    name: 'UserPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
