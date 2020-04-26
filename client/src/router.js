import Vue from 'vue';
import Router from 'vue-router';
import Questions from './components/Questions.vue';
import Ping from './components/Ping.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'questions',
      component: Questions,
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
  ],
});
