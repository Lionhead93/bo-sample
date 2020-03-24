import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import paths from '@/router/paths'

function route(path, view, name) {
  return {
    name: name,
    view: view,
    path,
    component: resolve => import(`@/views/${view}.vue`).then(resolve)
  }
}

Vue.use(VueRouter)

const routes = paths.map(path => route(path.path, path.view, path.name)).concat([{ path: '*', redirect: '/404' }])

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
