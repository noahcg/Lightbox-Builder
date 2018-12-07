<template>
  <div>
    <div class="container">
      <div class="row">
        <b-form class="col-md-6 formContainer form-signin mx-auto">
          <h1>Lightbox Builder</h1>
          <h2 class="mb-3 font-weight-normal">Please sign in</h2>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {    
    return {}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .formContainer {
    background: #EEEEEE;
    margin-top: 100px;
  }

  h1 {
    text-align: center;
    font: normal 400 2.5rem 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
  }

  h2 {
    margin-top: 30px;
    font: normal 400 1.5rem 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
  }

  .form-signin {
    padding: 30px 50px;
  }
  .form-signin .checkbox {
    // font-weight: 400;
    font: normal 400 1rem 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
