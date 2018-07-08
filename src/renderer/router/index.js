import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/LoginPage').default
    },
    {
      path: '/edit',
      name: 'edit',
      component: require('@/components/EditPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
