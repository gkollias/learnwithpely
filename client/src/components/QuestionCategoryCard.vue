<template>
  <div class="question_category__main">
    <b-card
      :title="title"
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        {{ this.subtitle }}
        <b-form-select
          id="form-question-category-input"
          v-model="selectedCategoryId"
          required
          placeholder="Enter question category"
        >
        <option v-for="qc in questionCategories"
          :value="qc.id" :key="qc.id">{{ qc.name }}
          </option>
        </b-form-select>
      </b-card-text>
      <b-button @click="getQuestions" variant="primary">{{this.ctaBtnText}}</b-button>
    </b-card>
    <div v-if="showNoResults">
      {{ this.noResultsText() }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'es6-promise/auto';
import { mapActions, mapState } from 'vuex';

import store from '../store';


export default {
  data() {
    return {
      questionType: '',
      questionCategories: {},
      selectedCategoryId: 0,
      showNoResults: false,
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
    title() {
      return 'Ερωτήσεις ανά κατηγορία';
    },
    subtitle() {
      return 'Παρακαλώ επίλεξε την κατηγορία ερώτησης που θα ήθελες:';
    },
    ctaBtnText() {
      return 'Πάμε!';
    },
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const path = `/api/questions/category/${this.selectedCategoryId}`;
      axios.get(path)
        .then((res) => {
          // eslint-disable-next-line no-console
          // console.log(JSON.stringify(res));
          store.dispatch('setQuestions', res.data.questions)
            .then(() => {
              if (this.questions.length > 0) {
                store.dispatch('showQuestions', true);
                store.dispatch('setNextQuestion');
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
    getQuestionCategories() {
      const path = '/api/questionCategories';
      axios.get(path)
        .then((res) => {
          this.questionCategories = res.data.question_categories;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    noResultsText() {
      return 'Δεν υπάρχουν αποτελέσματα για αυτή την κατηγορία, παρακαλώ επιλέξτε μία άλλη.';
    },
  },
  created() {
    this.getQuestionCategories();
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
