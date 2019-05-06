import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
      component: Layout,
      children: [
        { path: 'home', name: 'home', component: () => import('@/views/Home.vue') },
        { path: 'search', name: 'search', component: () => import('@/views/Search.vue') },
        { path: 'details', name: 'details', component: () => import('@/views/Details.vue') },
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})
