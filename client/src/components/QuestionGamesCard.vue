<template>
  <div class="question_games_main">
    <div v-if="showNoResults">
      {{ noResultsText() }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'es6-promise/auto';
import { mapActions, mapState } from 'vuex';

import store from '../store';

export default {
  props: {
    classId: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      showNoResults: false,
    };
  },
  computed: {
    ...mapActions(['setQuestions', 'setNextQuestion']),
    ...mapState(['questions']),
  },
  created() {
    this.getQuestions();
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const path = '/api/questions/filter';
      const payload = {
        class_id: 2,
        category_id: 2,
        subcategory_id: 5,
        // chapter_id: this.selectedChapterId,
      };
      axios.post(path, payload)
        .then((res) => {
          // eslint-disable-next-line no-console
          // console.log(JSON.stringify(res));
          store.dispatch('setQuestions', res.data.questions)
            .then(() => {
              if (this.questions.length > 0) {
                store.dispatch('showQuestions', true);
                store.dispatch('setNextQuestion', true);
                this.showNoResults = false;
              } else {
                this.showNoResults = true;
              }
            });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    noResultsText() {
      return 'Δεν υπάρχουν ερωτήσεις για αυτό το παιχνίδι.';
    },
  },
};
</script>

<style scoped>
.question_games_main{
  margin-left: 20px;
  margin-right: 20px;
  min-width: 360px;
  min-height: 200px;
}
</style>
