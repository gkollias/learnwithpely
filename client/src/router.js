import Vue from 'vue';
import Router from 'vue-router';
import { authenticationGuard } from './auth/authenticationGuard';
import QuestionManagement from './components/QuestionManagement.vue';
import ClassQuestion from './components/ClassQuestion.vue';
import Home from './components/Home.vue';

Vue.use(Router);

const router = new Router({
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
      path: '/classQuestion/:classQuestion',
      name: 'classQuestion',
      component: ClassQuestion,
      beforeEnter: authenticationGuard,
    },
  ],
});

export default router;
