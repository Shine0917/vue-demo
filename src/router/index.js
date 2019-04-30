import Vue from 'vue'
import Router from 'vue-router'
import orderList from '@/components/orderList'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'orderList',
      component: orderList
    }
  ]
})
