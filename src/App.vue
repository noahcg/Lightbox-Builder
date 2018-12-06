<template>
  <div id="app">
    <BasicForm />
  </div>
</template>

<script>
import BasicForm from './components/BasicForm.vue'


export default {
  name: 'app',
  components: {
    BasicForm
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
}
</style>
