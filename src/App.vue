<template>
  <div id="app">
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        authenticated: false,
        mockAccount: {
          email: "user@ushmm.org",
          password: "password"
        }
      }
    },
    mounted() {
      if(!this.authenticated) {
        this.$router.replace({ name: "login" });
      }
    },
    methods: {
      setAuthenticated(status) {
        this.authenticated = status;
      },
      logout() {
        this.authenticated = false;
      }
    }
  }
</script>

<style lang="scss">
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
