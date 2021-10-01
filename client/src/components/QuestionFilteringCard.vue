<template>
  <div class="question_category__main">
    <b-card
      header-tag="header"
      :img-src="categoryIcon"
      img-alt="Image"
      img-top
      style="width: 100%;max-width:fit-content;padding:20px; height: auto;"
      tag="article"
      class="mb-2"
    >
      <template #header>
        <a
          class="mb-0 mx-auto"
        >{{ title }}</a>
      </template>
      <b-card-text>
        <b-form-select
          id="form-question-category-input"
          v-model="selectedCategoryId"
          class="mt-2"
          required
          placeholder="Enter question category"
          @change="categoryChange"
        >
          <option
            v-for="qc in questionCategories"
            :key="qc.id"
            :value="qc.id"
          >
            {{ qc.name }}
          </option>
        </b-form-select>
        <b-form-select
          id="form-question-chapter-input"
          v-model="selectedChapterId"
          class="mt-2"
          required
          placeholder="Enter question chapter"
        >
          <option
            v-for="qc in questionChapters"
            :key="qc.id"
            :value="qc.id"
          >
            {{ qc.name }}
          </option>
        </b-form-select>
      </b-card-text>
      <b-button
        variant="primary"
        style="display: block"
        class="mx-auto bg-info"
        :disabled="!selectedCategoryId || !selectedChapterId "
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

const categoryIconConst = require('../assets/images/book-note-paper.png');

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
      questionCategories: {},
      questionChapters: [],
      selectedCategoryId: 0,
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
      return 'Ερωτήσεις';
    },
    subtitle() {
      return '';
    },
    ctaBtnText() {
      return 'Πάμε!';
    },
    categoryIcon() {
      return categoryIconConst;
    },
  },
  created() {
    this.getQuestionCategories();
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const path = '/api/questions/filter';
      const payload = {
        class_id: this.classId,
        category_id: this.selectedCategoryId,
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
    getQuestionCategories() {
      const path = '/api/questionCategories';
      axios.get(path)
        .then((res) => {
          res.data.question_categories.splice(0, 0, { id: 0, name: 'Παρακαλώ επιλέξτε μια κατηγορία' });
          this.questionCategories = res.data.question_categories;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getQuestionChapters() {
      const path = `/api/questionChapters/${this.selectedCategoryId}`;
      axios.get(path)
        .then((res) => {
          const localQc = [];
          localQc.push({ id: 0, name: 'Παρακαλώ επιλέξτε ένα κεφάλαιο' });

          res.data.question_chapters.forEach((item) => {
            localQc.push({ id: item, name: `Κεφάλαιο ${item}` });
          });
          this.questionChapters = localQc;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    noResultsText() {
      return 'Δεν υπάρχουν αποτελέσματα για αυτά τα κριτήρια.';
    },
    categoryChange() {
      this.getQuestionChapters();
      this.selectedChapterId = 0;
    },
  },
};
</script>

<style scoped>
.question_category__main{
  margin-left: 20px;
  margin-right: 20px;
  min-width: 360px;
  min-height: 200px;
}

.card-header, .card-footer {
    border-color: rgba(0, 0, 0, 0.03);
    display: flex;
}
</style>
