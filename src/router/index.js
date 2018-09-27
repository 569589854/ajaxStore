import Vue from 'vue'
import Router from 'vue-router'
// import Index from 'components/index/index'
import Shopcart from 'components/shopcart/shopcart'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Index
    // },
    {
      path: '/',
      component: Shopcart
    }
  ]
})
