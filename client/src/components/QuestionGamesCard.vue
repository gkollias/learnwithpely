<template>
  <div class="question_games_main">
    <b-card
      v-if="!isGameInProgress"
      header-tag="header"
      :img-src="gameIcon"
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
          id="form-question-game-input"
          v-model="selectedGameId"
          class="mt-2"
          required
          placeholder="Select Game"
        >
          <option
            v-for="qg in questionGames"
            :key="qg.id"
            :value="qg.id"
          >
            {{ qg.name }}
          </option>
        </b-form-select>
      </b-card-text>
      <b-button
        variant="primary"
        style="display: block"
        class="mx-auto bg-info"
        :disabled="!selectedGameId"
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

const gameIconConst = require('../assets/images/book-note-paper.png');

export default {
  props: {
    gameId: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      showNoResults: false,
      questionGames: {},
      selectedGameId: 0,
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },
    };
  },
  computed: {
    ...mapActions(['setQuestions', 'setNextQuestion']),
    ...mapState(['questions', 'currentQuestionId']),
    isGameInProgress() {
      return !!this.currentQuestionId;
    },
    title() {
      return 'Παιχνίδια';
    },
    subtitle() {
      return '';
    },
    ctaBtnText() {
      return 'Πάμε!';
    },
    gameIcon() {
      return gameIconConst;
    },
  },
  created() {
    if (!this.questions[0]) {
      this.getQuestions();
    } else {
      this.getQuestionGames();
    }
  },
  methods: {
    getQ() {
      return this.questions[0] ? this.questions[0].question : 'empty';
    },
    getQuestions() {
      const path = process.env.VUE_APP_API_URL + '/api/questions/filter';
      const multiplicationGameParams = {
        class_id: 2,
        category_id: 2,
        subcategory_id: 5,
      };

      let params;
      if (this.gameId === '101') {
        params = multiplicationGameParams;
      } else {
        // eslint-disable-next-line no-console
        console.log('Game id %s does not exist', this.gameId);
      }
      const payload = {
        class_id: params.class_id,
        category_id: params.category_id,
        subcategory_id: params.subcategory_id,
      };
      axios.post(path, payload)
        .then((res) => {
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
    getQuestionGames() {
      const path = process.env.VUE_APP_API_URL + '/api/questionGames';
      axios.get(path)
        .then((res) => {
          res.data.question_games.splice(0, 0, { id: 0, name: 'Παρακαλώ επιλέξτε ένα παιχνίδι' });
          this.questionGames = res.data.question_games;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
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
