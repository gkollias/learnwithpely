import Vue from 'vue';
import Router from 'vue-router';
import QuestionManagement from './components/QuestionManagement.vue';
import ClassQuestion from './components/ClassQuestion.vue';
import Home from './components/Home.vue';
import Ping from './components/Ping.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/questionManagement',
      name: 'questionManagement',
      component: QuestionManagement,
    },
    {
      path: '/classQuestion',
      name: 'classQuestion',
      component: ClassQuestion,
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
  ],
});
