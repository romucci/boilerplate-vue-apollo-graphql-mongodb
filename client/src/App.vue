<template>
  <div id="app">
    <v-alert class="alert" v-model="$store.state.alert" dismissible>
      Someone saw the message!!!
    </v-alert>
    <v-app>
      <v-layout class="justify-center align-center">
        <router-view></router-view>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

#app {
  background-color: rgba(66, 184, 131, 0.03)
}
.alert {
  font-family: 'Fira Code', sans-serif
}

</style>
