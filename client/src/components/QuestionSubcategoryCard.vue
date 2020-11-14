<template>
  <div class="question_subcategory__main">
    <b-card
      :title="title"
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        {{ this.subtitle }}
        <b-form-select
          id="form-question-subcategory-input"
          v-model="selectedSubcategoryId"
          required
          placeholder="Enter question subcategory"
        >
        <option v-for="qc in questionSubcategories"
          :value="qc.id" :key="qc.id">{{ qc.name }}
          </option>
        </b-form-select>
      </b-card-text>
      <b-button @click="getQuestions" variant="primary">Go</b-button>
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
      questionSubcategories: {},
      selectedSubcategoryId: 0,
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
      return 'Questions by Subcategory';
    },
    subtitle() {
      return 'Please select the question subcategory you want:';
    },
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const path = `/api/questions/subcategory/${this.selectedSubcategoryId}`;
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
    getQuestionSubcategories() {
      const path = '/api/questionSubcategories';
      axios.get(path)
        .then((res) => {
          this.questionSubcategories = res.data.question_subcategories;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    noResultsText() {
      return 'No results for this subcategory, please choose a different one';
    },
  },
  created() {
    this.getQuestionSubcategories();
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
