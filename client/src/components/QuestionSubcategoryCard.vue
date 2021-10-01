<template>
  <div class="question_subcategory__main">
    <b-card
      :title="title"
      :img-src="subcategoryIcon"
      img-alt="Image"
      img-top
      style="width: 100%;max-width:300px;padding:20px; height: auto;"
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        {{ subtitle }}
        <b-form-select
          id="form-question-subcategory-input"
          v-model="selectedSubcategoryId"
          required
          placeholder="Enter question subcategory"
        >
          <option
            v-for="qc in questionSubcategories"
            :key="qc.id"
            :value="qc.id"
          >
            {{ qc.name }}
          </option>
        </b-form-select>
      </b-card-text>
      <b-button
        variant="primary"
        :disabled="!selectedSubcategoryId"
        @click="getQuestions"
      >
        {{ ctaBtnText }}
      </b-button>
    </b-card>
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

const subcategoryIconConst = require('../assets/images/triangle.png');

export default {
  props: {
    classId: {
      type: String,
      default: '0',
    },
  },
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
      return 'Ερωτήσεις ανά υποκατηγορία';
    },
    subtitle() {
      return 'Παρακαλώ επίλεξε την υποκατηγορία ερώτησης που θα ήθελες:';
    },
    ctaBtnText() {
      return 'Πάμε!';
    },
    subcategoryIcon() {
      return subcategoryIconConst;
    },
  },
  created() {
    this.getQuestionSubcategories();
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const path = '/api/questions/filter';
      const payload = {
        class_id: this.classId,
        subcategory_id: this.selectedSubcategoryId,
      };
      axios.post(path, payload)
        .then((res) => {
          // eslint-disable-next-line no-console
          // console.log(JSON.stringify(res));
          store.dispatch('setQuestions', res.data.questions)
            .then(() => {
              if (this.questions.length > 0) {
                store.dispatch('showQuestions', true);
                store.dispatch('setNextQuestion', false);
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
      return 'Δεν υπάρχουν αποτελέσματα για αυτή την υποκατηγορία, παρακαλώ επιλέξτε μία άλλη.';
    },
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
