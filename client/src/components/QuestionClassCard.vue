<template>
  <div class="question_class__main">
    <b-card
      :title="title"
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        {{ subtitle }}
        <b-form-select
          id="form-question-class-input"
          v-model="selectedClassId"
          required
          placeholder="Enter question class"
        >
          <option
            v-for="qc in questionClasses"
            :key="qc.id"
            :value="qc.id"
          >
            {{ qc.name }}
          </option>
        </b-form-select>
      </b-card-text>
      <b-button
        variant="primary"
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

export default {
  data() {
    return {
      questionType: '',
      questionClasses: {},
      selectedClassId: 0,
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
      return 'Ερωτήσεις ανά τάξη';
    },
    subtitle() {
      return 'Παρακαλώ επίλεξε την τάξη ερώτησης που θα ήθελες:';
    },
    ctaBtnText() {
      return 'Πάμε!';
    },
  },
  created() {
    this.getQuestionClasses();
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const path = `/api/questions/class/${this.selectedClassId}`;
      axios.get(path)
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
    getQuestionClasses() {
      const path = '/api/questionClasses';
      axios.get(path)
        .then((res) => {
          this.questionClasses = res.data.question_classes;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    noResultsText() {
      return 'Δεν υπάρχουν αποτελέσματα για αυτή την τάξη, παρακαλώ επιλέξτε μία άλλη.';
    },
  },
};
</script>

<style scoped>
.question_class__main{
  margin-left: 20px;
  margin-right: 20px;
  min-width: 200px;
  min-height: 200px;
}
</style>
