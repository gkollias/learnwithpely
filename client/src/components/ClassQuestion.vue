<template>
  <div class="landing_wrap">
    <Header />
    <Intro />
    <div class="class-question__main">
      <div
        v-if="showQuestions"
        class="d-flex justify-content-center"
      >
        <Question
          v-if="currentQuestionId"
          :id="currentQuestionId"
          :speed-matters="speedMatters"
          :is-game="!!gameId"
        />
        <div v-else>
          <QuestionEnd />
        </div>
      </div>
      <div
        v-else
        class="d-flex justify-content-around"
      >
        <QuestionFilteringCard
          v-if="classQuestion"
          :class-id="classQuestion"
        />
        <QuestionGamesCard
          v-else
          :game-id="gameId"
        />
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
import QuestionEnd from './QuestionEnd.vue';
import QuestionFilteringCard from './QuestionFilteringCard.vue';
import QuestionGamesCard from './QuestionGamesCard.vue';
import 'animate.css';

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
    QuestionEnd,
    QuestionFilteringCard,
    QuestionGamesCard,
  },
  data() {
    return {
      classQuestion: this.$route.params.classQuestion < 100 ? this.$route.params.classQuestion : 0,
      gameId: this.$route.params.classQuestion > 100 ? this.$route.params.classQuestion : 0,
      speedMatters: this.$route.params.classQuestion > 100,
    };
  },
  computed: {
    ...mapState(['showQuestions', 'currentQuestionId']),
    ...mapActions(['initNextQuestion']),
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
