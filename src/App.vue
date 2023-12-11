<template>
  <div id="app">
    <HomePage />
    <LoginPage />
    <RegisterPage />
    <!-- <ProfilePage /> -->
  </div>
</template>

<script>
import HomePage from './pages/Home/HomePage.vue'
import LoginPage from './pages/Login/LoginPage.vue'
import RegisterPage from './pages/Login/RegisterPage.vue'
// import ProfilePage from './pages/Login/ProfilePage.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    LoginPage,
    RegisterPage,
    // ProfilePage
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
  /* margin-top: 10px; */
}
</style>
