<template>
  <div>
    <b-navbar variant='info' type='light' fixed='top' sticky>
      <b-navbar-brand tag='h1' class='mb-0'>Learn with Pely</b-navbar-brand>
      <b-navbar-nav class='ml-auto'>
        <b-nav-item-dropdown text='User' right>
          <b-dropdown-item href='#'>Account</b-dropdown-item>
          <b-dropdown-item href='#'>Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <h1>{{ msg }}</h1>
    <div class='d-flex flex-wrap justify-content-between align-content-center ml-auto'>
      <question id='1' />
      <question id='2' />
      <question id='3' />
      <question id='4' />
    </div>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href='https://router.vuejs.org' target='_blank' rel='noopener'>vue-router</a></li>
      <li><a href='https://vuex.vuejs.org' target='_blank' rel='noopener'>vuex</a></li>
      <li>
        <a href='https://github.com/vuejs/vue-devtools#vue-devtools' target='_blank' rel='noopener'
          >vue-devtools</a
        >
      </li>
      <li><a href='https://vue-loader.vuejs.org' target='_blank' rel='noopener'>vue-loader</a></li>
      <li>
        <a href='https://github.com/vuejs/awesome-vue' target='_blank' rel='noopener'
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import Question from './Question.vue';

Vue.use(Vuex);

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  components: {
    question: Question,
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
