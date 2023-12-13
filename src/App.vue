<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand">Katyjohn</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> 体验实时聊天吧！
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">管理员</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">用户</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> 注册
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> 登录
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Logout
          </a>
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import HomePage from './pages/Home/HomePage.vue'
// import LoginPage from './pages/Login/LoginPage.vue'
// import RegisterPage from './pages/Login/RegisterPage.vue'
// import ProfilePage from './pages/Login/ProfilePage.vue'

export default {
  name: 'App',
  computed: {
    currentUser() {
      return this.$store.state.vali.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('vali/logout');
      this.$router.push('/login');
    }
  }
}
</script>


