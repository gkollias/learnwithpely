<template>
  <div>
    <NavigationBar />
    testw {{this.cq}}
    <div v-if="showQuestions" class="d-flex justify-content-between">
      <Question :id="currentQuestionId" />
    </div>
    <div v-else class="d-flex justify-content-between">
      <QuestionCategoryCard category="category"/>
    </div>
    <!-- test{{this.props.q}} -->
    <!-- <b-img v-bind="imageProps" :src="getIconUrl" fluid alt="Responsive image"></b-img> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavigationBar from './NavigationBar.vue';
import Question from './Question.vue';
import QuestionCategoryCard from './QuestionCategoryCard.vue';


export default {
  name: 'ClassQuestion',
  props: {
    q: String,
  },
  components: {
    NavigationBar,
    Question,
    QuestionCategoryCard,
  },
  data() {
    return {
      cq: this.$route.params.cq,
    };
  },
  computed: {
    ...mapState(['showQuestions', 'currentQuestionId']),
    getIconUrl() {
      // eslint-disable-next-line global-require
      const url = require('../assets/images/cloud.svg');
      return url;
    },
  },
  methods: {
  },
  created() {
  },
};
</script>

<style scoped>
</style>
