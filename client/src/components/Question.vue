<template>
  <div>
    <FlipCard
      v-if="question"
      :flipped="questionAnswered"
    >
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
              v-if="question.answer"
              v-model="selectedAnswer"
              :options="Object.keys(question.answer)"
              name="radios-stacked"
              stacked
            />
          </b-form-group>
          <b-button
            :disabled="!selectedAnswer"
            variant="primary"
            @click="answerClick"
          >
            {{ answerButtonText }}
          </b-button>
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
          <!-- <transition
            appear
            enter-active-class="animate__animated animate__bounceOutUp"
          >
            <h2
              :v-if="questionAnswered"
              style="text-align:center"
            >
              +100!
            </h2>
          </transition> -->
          <transition
            appear
            enter-active-class="animate__animated animate__bounceOutUp"
          >
            <p
              v-if="checkAnswerCorrectness && questionAnswered"
              class="question-card__score-transition"
            >
              +100!
            </p>
          </transition>
          <b-card-text>
            {{ answerOutcomeText }} {{ getCorrectAnswer }}

            <!-- <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
              style="width: 320px"
            >
            </lottie-player> -->
          </b-card-text>
          <b-button
            variant="primary"
            @click="nextQuestion"
          >
            {{ nextButtonText }}
          </b-button>
        </b-card>
      </template>
    </FlipCard>
    <div class="flip-container" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import _ from 'lodash';
import '@lottiefiles/lottie-player';
import FlipCard from './FlipCard.vue';
import store from '../store';

export default {
  components: {
    FlipCard,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
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
        return false;
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
      const correctAnswer = identifiers.filter((id) => answer[id]);
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
  watch: {
    id() {
      this.getQuestion(this.id);
    },
  },
  created() {
    this.getQuestion(this.id);
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
      this.selectedAnswer = '';
    },
    storeAnsweredQuestion(isCorrect) {
      if (_.isEmpty(this.user)) {
        return;
      }
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
};
</script>

<style>
.question-card__question{
  background-color: beige!important;
  padding: 10px 10px 10px 10px;
}

.question-card__answer-correct{
  background-color: rgb(87, 233, 87)!important;
}

.question-card__answer-wrong{
  background-color: rgb(255, 121, 121)!important;
}

.question-card__score-transition {
  text-align: center;
}

.animate__animated.animate__bounceOutUp {
  animation-duration: 2s;
  text-align: center;
}

</style>
