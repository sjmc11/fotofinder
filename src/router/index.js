import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '', name: 'Home', component: () => import('../views/HomeView') }, // all components are inline - lazy import & preference of less lines
    { path: '/faves', name: 'Favourites', component: () => import('../views/HomeView') },
    { path: '/photo/:id', name: 'Photo', component: () => import('../views/PhotoSingle') },
    { path: '/user/:username', name: 'User', component: () => import('../views/UserView') },
    { path: '/auth', name: 'Auth', component: () => import('../views/AuthView') }
  ]
})

router.beforeEach(async (toRoute, fromRoute, next) => {
  /** Auth guard **/
  // Get the client_id directly from localstorage to ensure available on first enter
  // If using Pinia or VueX would use that as truth.
  const storageClientId = localStorage.getItem('client_id')
  if (!storageClientId) {
    // Navigate to auth page if unauthorized... (ternary prevents infinite loop)
    next({ path: (toRoute.path !== '/auth' ? '/auth' : null) })
    return
  }
  next()
})

export default router
