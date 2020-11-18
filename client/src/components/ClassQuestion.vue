<template>
  <div>
    <NavigationBar />
    <div class="class_question__main-container">
      <div v-if="showQuestions" class="d-flex justify-content-center">
        <Question :id="currentQuestionId" />
      </div>
      <div v-else class="d-flex justify-content-between">
        <QuestionClassCard />
        <QuestionCategoryCard />
        <QuestionSubcategoryCard />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import store from '../store';

import NavigationBar from './NavigationBar.vue';
import Question from './Question.vue';
import QuestionCategoryCard from './QuestionCategoryCard.vue';
import QuestionClassCard from './QuestionClassCard.vue';
import QuestionSubcategoryCard from './QuestionSubcategoryCard.vue';

export default {
  name: 'ClassQuestion',
  props: {
    q: String,
  },
  components: {
    NavigationBar,
    Question,
    QuestionClassCard,
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
  methods: {
  },
  created() {
    store.dispatch('initNextQuestion');
    store.dispatch('showQuestions', false);
  },
};
</script>

<style scoped>
.class_question__main-container{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
