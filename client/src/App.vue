<template>
  <div id="app">
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
</style>
