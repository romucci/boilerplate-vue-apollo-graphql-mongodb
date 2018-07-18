<template>
  <div>
    <v-btn large outline color="blue">
      {{ vuexMessage }}
    </v-btn>
    <v-btn large outline v-if="!serverMessage" color="green" @click="insertGreeting">
      GraphQL Server
    </v-btn>
    <v-badge class="message">
      {{ serverMessage }}
    </v-badge>
  </div>
</template>

<script>
import { GREETING_QUERY, GREETING_SUBSCRIPTION } from '../constants/graphql'

export default {
  name: 'welcome-component',
  data () {
    return {
      serverMessage: '',
      storeMessage: ''
    }
  },
  mounted () {
    const vm = this
    const observer = this.$apollo.subscribe({
      query: GREETING_SUBSCRIPTION
    })

    observer.subscribe({
      next () {
        vm.$store.state.alert = true
      },
      error (error) {
        console.error(error)
      }
    })
  },
  computed: {
    vuexMessage () {
      return this.$store.state.storeMessage
    }
  },
  methods: {
    insertGreeting () {
      this.$apollo.query({
        query: GREETING_QUERY
      }).then(result => {
        this.serverMessage = result.data.getGreeting
      })
    }
  }
}
</script>

<style scoped>

.message {
  color: #42b883;
  font-size: 35px !important;
}

</style>
