<template>
  <b-navbar
    variant="info"
    type="light"
    fixed="top"
    sticky
    style="background-color:rgb(186, 88, 67)!important"
  >
    <b-navbar-brand
      tag="h1"
      class="mb-0"
    >
      <router-link
        style="color:black"
        to="/"
      >
        {{ titleText }}
      </router-link>
    </b-navbar-brand>
    <b-navbar-nav
      v-if="!$auth.loading"
      class="ml-auto"
    >
      <b-nav-text
        v-if="$auth.isAuthenticated"
        align="left"
      >
        {{ scoreText }} {{ userScore }} {{ levelText }} {{ level }}
      </b-nav-text>
      <b-nav-item-dropdown
        v-if="$auth.isAuthenticated"
        :text="getUserName()"
        right
      >
        <b-dropdown-item href="#">
          Account
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Settings
        </b-dropdown-item>
        <b-dropdown-item @click="logout">
          Log out
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-avatar
        v-if="$auth.isAuthenticated"
        variant="info"
        :src="getProfilePicture()"
      />
      <b-button
        v-if="!$auth.isAuthenticated"
        variant="primary"
        @click="login"
      >
        {{ signInText }}
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
  components: {
  },
  props: {
  },
  computed: {
    ...mapState(['userScore']),
    ...mapActions(['setAuthorization']),
    titleText() {
      return 'Learn with me';
    },
    signInText() {
      return 'Sign in';
    },
    scoreText() {
      return 'Score:';
    },
    levelText() {
      return 'Επίπεδο:';
    },
    level() {
      return Math.floor(this.userScore / 100);
    },
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
      // eslint-disable-next-line no-console
      // console.log(JSON.stringify(this.$auth.user));
      return this.$auth && this.$auth.user && this.$auth.user.name;
    },
  },
};
</script>
