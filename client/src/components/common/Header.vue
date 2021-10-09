<template>
  <div
    id="home-header"
    class="main-header header-fixed-default"
  >
    <b-navbar
      class="navbar container w-100 navbar-expand-lg navbar-transparent bg-transparent"
      toggleable="lg"
      type=""
      variant=""
    >
      <b-navbar-brand href="#">
        <div class="logo">
          <router-link
            to="/"
          >
            <img
              src="@/assets/images/logos/emoji_me.png"
              alt=""
            >
          </router-link>
        </div>
      </b-navbar-brand>
      <b-navbar-brand class="mr-auto text-18 text-white">
        <router-link
          style="color:white"
          to="/"
        >
          Learn with me
        </router-link>
      </b-navbar-brand>
      <b-navbar-toggle
        target="nav-collapse"
        class="eva eva-menu-outline text-18 text-white"
      />

      <!-- <div class="menu-toggle navbar-toggler"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
                    <div></div>
                    <div></div>
                    <div></div>
                </div> -->

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <div style="margin: auto" />
        <!-- Right aligned nav items -->
        <b-navbar-nav class="header-part-right">
          <!-- <b-nav-item href="#intro-wrap" v-smooth-scroll class="m-2"
            >Home <span class="sr-only">(current)</span></b-nav-item
          > -->

          <!-- <li class="nav-item">
            <a
              v-smooth-scroll
              href="#intro-wrap"
              class="m-2"
            >Home <span class="sr-only">(current)</span></a>
          </li> -->
          <li class="nav-item">
            <router-link
              to="/"
            >
              {{ titleText }}
            </router-link>
          </li>
          <li
            v-if="!$auth.loading && $auth.isAuthenticated"
            class="nav-item pl-3"
          >
            <a class="score">
              {{ scoreText }}
              <animated-number
                :value="userScore"
                :format-value="formatToPrice"
                :duration="1000"
              />
            </a>
          </li>
          <li
            v-if="!$auth.loading && $auth.isAuthenticated"
            class="nav-item pl-3"
          >
            <a class="level">
              {{ levelText }}
              <animated-number
                :value="level"
                :format-value="formatToLevel"
                :duration="1000"
              />
            </a>
          </li>
          <li
            v-if="!$auth.loading && !$auth.isAuthenticated"
            class="nav-item pl-3"
          >
            <a
              id=""
              class="btn half-button btn-outline-white btn-sm pl-3 pr-3
              mr-1 text-uppercase"
              href="#"
              role="button"
              @click="login"
            >
              {{ signInText }}
            </a>
          </li>
          <li
            v-if="!$auth.loading && !$auth.isAuthenticated"
            class="nav-item pl-3"
          >
            <a
              id=""
              class="btn half-button btn-warning btn-sm pl-3 pr-3 mr-1 text-uppercase"
              href="#"
              role="button"
              @click="login"
            >
              {{ signUpText }}
            </a>
          </li>
          <li
            v-if="$auth.isAuthenticated"
            class="nav-item b-nav-dropdown dropdown"
          >
            <a
              href="#"
              class="nav-link m-2 m-2"
            >
              <span>{{ getUserName() }}</span>
            </a>
            <ul>
              <!-- <li class="nav-item">
                <a
                  v-smooth-scroll
                  href="#"
                  class="menu-item"
                >Account</a>
              </li>
              <li class="nav-item">
                <a
                  v-smooth-scroll
                  href="#"
                  class="menu-item"
                >Settings</a>
              </li> -->
              <li
                class="nav-item"
                @click="logout"
              >
                <a
                  v-smooth-scroll
                  href="#"
                  class="menu-item"
                >Log out</a>
              </li>
            </ul>
          </li>
          <li
            v-if="$auth.isAuthenticated"
            class="nav-item"
          >
            <b-avatar
              v-if="$auth.isAuthenticated"
              :src="getProfilePicture()"
            />
          </li>
          <!-- <li class="nav-item">
            <a
              v-smooth-scroll
              href="#games-wrap"
              class="m-2"
            >Services</a>
          </li> -->

          <!-- drop down menu end -->
          <!-- <li class="nav-item">
            <a
              v-smooth-scroll
              href="#pricing-wrap"
              class="m-2"
            >Pricing</a>
          </li>
          <li class="nav-item">
            <a
              v-smooth-scroll
              href="#news-wrap"
              class="m-2"
            >News</a>
          </li>

          <li class="nav-item">
            <a
              v-smooth-scroll
              href="#contacts-wrap"
              class="m-2"
            >Contact Us</a>
          </li> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import Vue from 'vue';
import 'es6-promise/auto';
import Vuex, { mapActions, mapState } from 'vuex';
import AnimatedNumber from 'animated-number-vue';

Vue.use(Vuex);

export default {
  components: {
    AnimatedNumber,
  },
  data() {
    return {
      link: {
        hash: ['#testimonials-wrap'],
      },
    };
  },
  computed: {
    ...mapState(['userScore']),
    ...mapActions(['setAuthorization']),
    titleText() {
      return 'Home';
    },
    signInText() {
      return 'Sign in';
    },
    signUpText() {
      return 'Sign up';
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
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scroll = window.pageYOffset;
      if (scroll >= 80) {
        document.querySelector('.main-header').classList.add('header-fixed');
      } else {
        document.querySelector('.main-header').classList.remove('header-fixed');
      }
    },
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
    formatToPrice(value) {
      return `${Number(value).toFixed(2)}`;
    },
    formatToLevel(value) {
      return `${Number(value).toFixed(0)}`;
    },
  },
};
</script>

<style>
li>a:after {
    content: "";
}
</style>
