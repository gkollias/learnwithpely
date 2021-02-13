<template>
  <div class="question_chapter__main">
    <b-card
      :title="title"
      :img-src="chapterIcon"
      img-alt="Image"
      img-top
      style="width: 100%;max-width:300px;padding:20px; height: auto;"
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        {{ subtitle }}
        <b-form-select
          id="form-question-chapter-input"
          v-model="selectedChapterId"
          required
          placeholder="Enter question chapter"
        >
          <option
            v-for="qc in questionChapters"
            :key="qc"
            :value="qc"
          >
            Κεφάλαιο {{ qc }}
          </option>
        </b-form-select>
      </b-card-text>
      <b-button
        variant="primary"
        :disabled="!selectedChapterId"
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

const chapterIconConst = require('../assets/images/board-math-class.png');

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
      questionChapters: {},
      selectedChapterId: 0,
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
      return 'Ερωτήσεις ανά κεφάλαιο';
    },
    subtitle() {
      return 'Παρακαλώ επίλεξε το κεφάλαιο ερώτησης που θα ήθελες:';
    },
    ctaBtnText() {
      return 'Πάμε!';
    },
    chapterIcon() {
      return chapterIconConst;
    },
  },
  created() {
    this.getQuestionChapters();
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const path = '/api/questions/filter';
      const payload = {
        class_id: this.classId,
        chapter_id: this.selectedChapterId,
      };
      axios.post(path, payload)
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
    getQuestionChapters() {
      const path = '/api/questionChapters';
      axios.get(path)
        .then((res) => {
          this.questionChapters = res.data.question_chapters;
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
};
</script>

<style scoped>
.question_chapter__main{
  margin-left: 20px;
  margin-right: 20px;
  min-width: 200px;
  min-height: 200px;
}
</style>
