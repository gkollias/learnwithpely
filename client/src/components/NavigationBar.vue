<template>
    <b-navbar variant='info' type='light' fixed='top' sticky
    style='background-color:rgb(186, 88, 67)!important'>
      <b-navbar-brand tag='h1' class='mb-0'>
        <router-link style="color:black" to="/">
            Learn with Pely
        </router-link>
      </b-navbar-brand>
      <b-navbar-nav v-if="!$auth.loading" class='ml-auto'>
        <b-nav-text v-if="$auth.isAuthenticated" align="left">Score: {{this.userScore}}</b-nav-text>
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
</template>

<script>
import Vue from 'vue';
import 'es6-promise/auto';
import Vuex, { mapActions, mapState } from 'vuex';

Vue.use(Vuex);

export default {
  name: 'NavigationBar',
  props: {
    msg: String,
  },
  components: {
  },
  computed: {
    ...mapState(['userScore']),
    ...mapActions(['setAuthorization']),
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect({
        redirectUri: window.location.href,
      });
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        redirectUri: window.location.href,
      });
    },
    getProfilePicture() {
      return this.$auth && this.$auth.user && this.$auth.user.picture;
    },
    getUserName() {
      return this.$auth && this.$auth.user && this.$auth.user.name;
    },
  },
};
</script>
