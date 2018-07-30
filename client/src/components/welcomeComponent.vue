<template>
  <div class="welcomeMessage">
    <v-btn
      large
      outline
      color="black"
      v-if="!vuexMessage"
      @click="insertVuexMessage"
    >
      Vuex Store
    </v-btn>
    <v-btn
      large
      outline
      color="purple"
      v-if="vuexMessage"
    >
      {{ vuexMessage }}
    </v-btn>
    <v-btn
      large
      outline
      color="green"
      v-if="!serverMessage"
      @click="insertGreeting"
    >
      GraphQL Server
    </v-btn>
    <v-btn
      large
      outline
      color="red"
      v-if="serverMessage"
    >
      {{ serverMessage }}
    </v-btn>
  </div>
</template>

<script>

// IMPORTS
import { GREETING_QUERY, GREETING_SUBSCRIPTION } from '../constants/graphql'

export default {
  name: 'welcome-component',
  data () {
    return {
      serverMessage: '',
      vuexMessage: ''
    }
  },
  methods: {
    // GET GREETING FROM SERVER
    insertGreeting () {
      this.$apollo.query({
        query: GREETING_QUERY
      })
        .then(result => {
          this.serverMessage = result.data.getGreeting
        })
    },
    // GET MESSAGE FROM VUEX * YOU CAN DO THIS WITH COMPUTED PROPERTIES *
    insertVuexMessage () {
      this.vuexMessage = this.$store.state.storeMessage
    }
  },
  mounted () {
    // SETUP SUBSCRIPTION
    const vm = this
    const observer = this.$apollo.subscribe({
      query: GREETING_SUBSCRIPTION
    })

    observer.subscribe({
      next () {
        vm.$store.state.alert = true
        setTimeout(() => {
          vm.$store.state.alert = false
        }, 2000)
      },
      error (error) {
        console.error(error)
      }
    })
  }
}
</script>

<style scoped>

.welcomeMessage {
  padding: 80px;
  background-color: rgba(16, 255, 12, 0.03);
  border: 3px dotted black
}

</style>
