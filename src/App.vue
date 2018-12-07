<template>
  <div id="app">
    <!-- <Login /> -->
    <Dashboard />
    <!-- <BasicForm /> -->
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import BasicForm from './components/BasicForm.vue'


export default {
  name: 'app',
  components: {
    BasicForm,
    Login,
    Dashboard
  }
}
</script>

<style>
#app {
  background: url('/images/ushmm_background.jpg') no-repeat 0 0;
  background-attachment: fixed;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0;
  padding: 30px 0;
  min-height: 100vh;
}
</style>
