<template>
  <div>
    <v-btn class="btn--large btn--outline" v-if="!serverMessage" color="blue"> {{vuexMessage}} </v-btn>
    <v-btn class="btn--large btn--outline" v-if="!serverMessage" color="green" @click="insertGreeting"> GraphQL Server </v-btn>
    <v-badge id="message">
      {{serverMessage}}
    </v-badge>
  </div>
</template>

<script>
import { GREETING_QUERY } from '../constants/graphql'

export default {
  name: 'welcome-component',
  data () {
    return {
      serverMessage: '',
      storeMessage: ''
    }
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

#message {
  color: #42b883;
  font-size: 70px !important;
}

</style>
