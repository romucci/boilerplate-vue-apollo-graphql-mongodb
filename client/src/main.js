import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Router from './router/router'
import Vuetify from 'vuetify'

import App from './App'
import store from './store/store'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: '__YOUR__GRAPHQL__URL'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)
Vue.use(Vuetify)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
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
