<template>
  <div id="app">
    <!-- <TestOne /> -->
    <router-link to="/yifan">yifan</router-link> |
    <router-link to="/yihua">yihua</router-link>
    <hr>
     <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
