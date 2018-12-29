import Vue from 'vue'
import Ebook from '@/Ebook'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: "/ebook"
    },
    {
      path: '/ebook',
      name: 'ebook',
      component: Ebook
    }
  ]
})
