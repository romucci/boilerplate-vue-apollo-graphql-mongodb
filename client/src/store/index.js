import Vue from 'vue'
import Vuex from 'vuex'
import apolloClient from '../apollo/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    storeMessage: 'Hello from the Vuex Store!',
    alert: false
  },
  actions: {
    apolloShow () {
      console.log(apolloClient)
    }
  }
})

export default store
