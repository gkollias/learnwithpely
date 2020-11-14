<template>
  <div>
    <FlipCard v-if="question" :flipped="isFlipped">
      <template slot="front">
        <b-card
            :title="question.question"
            :img-src="question.image_url"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 question-card__question"
          >
          <b-card-text>
            {{ question.question }}
          </b-card-text>
          <b-form-group label="Choose the correct answer:">
            <b-form-radio-group
              v-model="selectedAnswer"
              v-if="question.answer"
              :options="Object.keys(question.answer)"
              name="radios-stacked"
              stacked
            ></b-form-radio-group>
          </b-form-group>
          <b-button @click="flip" variant="primary">Go</b-button>
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
          <b-button @click="nextQuestion" variant="primary">Next</b-button>
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
      isFlipped: false,
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },

    };
  },
  computed: {
    ...mapActions(['setNextQuestion']),
    ...mapState(['questions']),
    answerImageStyle() {
      return this.checkAnswerCorrectness ? 'question-card__answer-correct' : 'question-card__answer-wrong';
    },
    checkAnswerCorrectness() {
      if (_.isEmpty(this.question)) {
        return '';
      }
      if (!this.selectedAnswer) {
        return false;
      }
      const answer = this.question.answer[this.selectedAnswer];
      return answer;
    },
    answerOutcomeText() {
      if (this.checkAnswerCorrectness) {
        return 'Great job! The correct answer is: ';
      }
      return 'Better luck next time. The correct answer is: ';
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
    flip() {
      this.isFlipped = true;
    },
    nextQuestion() {
      store.dispatch('setNextQuestion');
      this.isFlipped = false;
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
