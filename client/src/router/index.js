import Vue from 'vue'
import Router from 'vue-router'
import welcomeComponent from '../components/welcomeComponent'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: welcomeComponent
  }
]

export default new Router({
  mode: 'history',
  routes
})
