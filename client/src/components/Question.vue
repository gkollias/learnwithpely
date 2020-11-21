<template>
  <div>
    <FlipCard v-if="question" :flipped="questionAnswered">
      <template slot="front">
        <b-card
            :title="question.question"
            :img-src="question.image_url"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 question-card__question"
          >
          <!-- <b-card-text>
            {{ question.question }}
          </b-card-text> -->
          <b-form-group :label="getQuestionLabel">
            <b-form-radio-group
              v-model="selectedAnswer"
              v-if="question.answer"
              :options="Object.keys(question.answer)"
              name="radios-stacked"
              stacked
            ></b-form-radio-group>
          </b-form-group>
          <b-button @click="answerClick" variant="primary">{{this.answerButtonText}}</b-button>
        </b-card>
      </template>
      <template slot="back">
        <b-card
          :title="question.question"
          :img-src="question.image_url"
          img-top
          tag="article"
          :class="answerImageStyle"
          class="mb-2 question-card__answer"
        >
          <b-card-text>
            {{this.answerOutcomeText}} {{ this.getCorrectAnswer }}
          </b-card-text>
          <b-button @click="nextQuestion" variant="primary">{{this.nextButtonText}}</b-button>
        </b-card>
      </template>
    </FlipCard>
    <div class="flip-container">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import _ from 'lodash';
import FlipCard from './FlipCard.vue';
import store from '../store';

export default {
  components: {
    FlipCard,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      question: {},
      selectedAnswer: '',
      questionAnswered: false,
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },

    };
  },
  computed: {
    ...mapActions(['setNextQuestion', 'incrementScore']),
    ...mapState(['questions', 'user']),
    answerImageStyle() {
      if (!this.questionAnswered) {
        return 'question-card__question';
      }
      return this.checkAnswerCorrectness ? 'question-card__answer-correct' : 'question-card__answer-wrong';
    },
    checkAnswerCorrectness() {
      if (_.isEmpty(this.question)) {
        return '';
      }
      if (!this.selectedAnswer) {
        return false;
      }
      const isAnswerCorrect = this.question.answer[this.selectedAnswer];

      return isAnswerCorrect;
    },
    getCorrectAnswer() {
      if (_.isEmpty(this.question)) {
        return '';
      }
      const { answer } = this.question;
      const identifiers = Object.keys(answer);
      const correctAnswer = identifiers.filter(id => answer[id]);
      return correctAnswer[0];
    },
    answerOutcomeText() {
      if (this.checkAnswerCorrectness) {
        return 'Μπράβο! Η σωστή απάντηση είναι: ';
      }
      return 'Κρίμα, αυτό δεν είναι σωστό. Η σωστή απάντηση είναι: ';
    },
    getQuestionLabel() {
      return 'Παρακαλώ επέλεξε τη σωστή απάντηση:';
    },
    answerButtonText() {
      return 'OK';
    },
    nextButtonText() {
      return 'Επόμενη ερώτηση';
    },
  },
  methods: {
    getQuestion(id) {
      const path = `/api/questions/${id}`;
      axios.get(path)
        .then((res) => {
          this.question = res.data.questions;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    answerClick() {
      this.questionAnswered = true;
      if (this.checkAnswerCorrectness) {
        store.dispatch('incrementScore', 10);
        this.storeAnsweredQuestion(true);
      } else {
        this.storeAnsweredQuestion(false);
      }
    },
    nextQuestion() {
      store.dispatch('setNextQuestion');
      this.questionAnswered = false;
    },
    storeAnsweredQuestion(isCorrect) {
      // eslint-disable-next-line no-console
      console.log(this.user);
      const payload = {
        user_id: this.user.id,
        question_id: this.id,
        is_correct: isCorrect,
      };
      const path = '/api/user/questions/answered/add';
      axios.post(path, payload)
        .then(() => {
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  watch: {
    id() {
      this.getQuestion(this.id);
    },
  },
  created() {
    this.getQuestion(this.id);
  },
};
</script>

<style>
.question-card__question{
  background-color: beige;
}

.question-card__answer-correct{
  background-color: green;
}

.question-card__answer-wrong{
  background-color: red;
}

</style>
