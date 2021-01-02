<template>
  <div class="landing_wrap">
    <Header />
    <Intro />
    <div class="class-question__main">
      <div
        v-if="showQuestions"
        class="d-flex justify-content-center"
      >
        <Question :id="currentQuestionId" />
      </div>
      <div
        v-else
        class="d-flex justify-content-between"
      >
        <QuestionCategoryCard :class-id="classQuestion" />
        <QuestionSubcategoryCard :class-id="classQuestion" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import store from '../store';

import Header from './common/Header.vue';
import Footer from './common/Footer.vue';
import Intro from './intros/introCut.vue';
import Question from './Question.vue';
import QuestionCategoryCard from './QuestionCategoryCard.vue';
import QuestionSubcategoryCard from './QuestionSubcategoryCard.vue';

export default {
  name: 'ClassQuestion',
  metaInfo: {
    bodyAttrs: {
      class: ['landing-gradient-slight-ocean'],
    },
  },
  components: {
    Header,
    Footer,
    Intro,
    Question,
    QuestionCategoryCard,
    QuestionSubcategoryCard,
  },
  data() {
    return {
      classQuestion: this.$route.params.classQuestion,
    };
  },
  computed: {
    ...mapState(['showQuestions', 'currentQuestionId']),
    ...mapActions(['initNextQuestion']),
    // getIconUrl() {
    //   // eslint-disable-next-line global-require
    //   const url = require('../assets/images/cloud.svg');
    //   return url;
    // },
  },
  created() {
    store.dispatch('initNextQuestion');
    store.dispatch('showQuestions', false);
  },
  methods: {
  },
};
</script>

<style>
.class-question__main {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
