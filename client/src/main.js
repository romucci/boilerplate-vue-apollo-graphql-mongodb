import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Router from './router/router'
import Vuetify from 'vuetify'
import ApolloClient from './apollo'

import App from './App'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(VueApollo)
Vue.use(Vuetify)

const apolloProvider = new VueApollo({
  defaultClient: ApolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

/* eslint-disable no-new */
new Vue({
  store: store,
  router: Router,
  el: '#app',
  provide: apolloProvider.provide(),
  render: h => h(App)
})
