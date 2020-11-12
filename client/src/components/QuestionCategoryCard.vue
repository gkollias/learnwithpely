<template>
  <div class="question_category__main">
    <b-card
      :title="category"
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        test {{getQ()}} test
        {{ this.questions }}
      </b-card-text>
      <b-button @click="getQuestions" variant="primary">Go</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
import 'es6-promise/auto';
import { mapActions, mapState } from 'vuex';

import store from '../store';


export default {
  props: {
    category: String,
  },
  data() {
    return {
      questionType: '',
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },

    };
  },
  computed: {
    ...mapActions(['setQuestions', 'setNextQuestion']),
    ...mapState(['questions']),
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const categoryId = 1;
      const path = `/api/questions/category/${categoryId}`;
      axios.get(path)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res));
          store.dispatch('setQuestions', res.data.questions)
            .then(() => {
              store.dispatch('showQuestions', true);
              store.dispatch('setNextQuestion');
            });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  created() {
  },
};
</script>

<style scoped>
.question_category__main{
  margin-left: 20px;
  margin-right: 20px;
  min-width: 200px;
  min-height: 200px;
}
</style>
