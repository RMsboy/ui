<template>
  <div id="app">
    <TestOne />
  </div>
</template>

<script>
import TestOne from './components/test-one'

export default {
  name: 'App',
  components: {
    TestOne
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
