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
            {{ question.answer }}
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
      elementId: '',
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
      if (!this.selectedAnswer) {
        return false;
      }
      const answer = this.question.answer[this.selectedAnswer];
      return answer;
    },
  },
  methods: {
    getQuestion(id) {
      const path = `/api/questions/${id}`;
      axios.get(path)
        .then((res) => {
          // alert(res.data.questions);
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
      // eslint-disable-next-line no-console
      console.log('nextQuestion');
      store.dispatch('setNextQuestion');
      this.isFlipped = false;
    },
  },
  created() {
    this.elementId = `question_${this.id}`;
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
