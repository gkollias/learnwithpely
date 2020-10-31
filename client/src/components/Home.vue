<template>
  <div>
    <b-navbar variant='info' type='light' fixed='top' sticky
    style='background-color:rgb(186, 88, 67)!important'>
      <b-navbar-brand tag='h1' class='mb-0'>
        Learn with Pely
      </b-navbar-brand>
      <b-navbar-nav v-if="!$auth.loading" class='ml-auto'>
        <b-nav-item-dropdown v-if="$auth.isAuthenticated" :text='getUserName()' right>
          <b-dropdown-item href='#'>Account</b-dropdown-item>
          <b-dropdown-item href='#'>Settings</b-dropdown-item>
          <b-dropdown-item @click="logout">Log out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-avatar v-if="$auth.isAuthenticated" variant="info" :src="getProfilePicture()"></b-avatar>
        <b-button v-if="!$auth.isAuthenticated" variant="primary" @click="login">
          Sign in
        </b-button>
      </b-navbar-nav>
    </b-navbar>
    <div>
        <b-img :src="getIconUrl()" fluid alt="Fluid-grow image"></b-img>
    </div>

    <div class='d-flex flex-wrap justify-content-between align-content-center ml-auto'>
      <cloud classQuestion="Α"/>
      <cloud classQuestion="Β"/>
      <cloud classQuestion="Γ"/>
      <!-- <question id='1' />
      <question id='2' />
      <question id='3' />
      <question id='4' /> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import Cloud from './Cloud.vue';

Vue.use(Vuex);

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  components: {
    cloud: Cloud,
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
    getProfilePicture() {
      return this.$auth && this.$auth.user && this.$auth.user.picture;
    },
    getUserName() {
      return this.$auth && this.$auth.user && this.$auth.user.name;
    },
    getIconUrl() {
      // eslint-disable-next-line global-require
      const url = require('../assets/images/LearnwithPely.png');
      return url;
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
