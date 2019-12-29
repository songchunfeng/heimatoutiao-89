import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login'
import Home1 from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/home',
  name: 'home',
  component: Home,
  children: [{
    path: '',
    component: Home1
  }, {
    path: 'comment',
    component: () => import('../views/comment')
  },
  {
    path: 'material',
    component: () => import('../views/material')
  },
  {
    path: 'articles',
    component: () => import('../views/articles')
  },
  {
    path: 'publish',
    component: () => import('../views/publish')
  },
  {
    path: 'publish/:id',
    component: () => import('../views/publish')
  }, {
    path: 'account', // 账户信息
    component: () => import('../views/account')
  }]
}, {
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
}

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
