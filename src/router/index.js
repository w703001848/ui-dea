import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/design',
    name: 'Design',
    component: () => import('../views/design.vue')
  },
  {
    path: '/icons',
    name: 'Icons',
    component: () => import('../views/icons.vue')
  },
  {
    path: '/images',
    name: 'Images',
    component: () => import('../views/images.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
