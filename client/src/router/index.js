// IMPORTS
import Vue from 'vue'
import Router from 'vue-router'
import welcomeComponent from '../components/welcomeComponent'

Vue.use(Router)

// ROUTES
const routes = [
  {
    path: '/',
    name: 'welcome',
    component: welcomeComponent
  }
]
// EXPORT ROUTER
export default new Router({
  mode: 'history',
  routes
})
