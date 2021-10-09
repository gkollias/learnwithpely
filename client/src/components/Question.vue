<template>
  <div>
    <div>
      <div
        v-if="speedMatters"
        class="row pt-5"
      >
        <div class="col-md-12 question-card__timer text-center pt-5">
          <Countdown
            :restart-timer="restartTimer"
            :timer-stopped="timerStopped"
          />
        </div>
        <!-- <div>
          <b-progress
            :max="max"
            height="2rem"
            show-progress
          >
            <b-progress-bar
              :value="value"
              variant="success"
            >
              <h5 v-if="value > 1">
                Time Bonus {{ timerBonus }}
              </h5>
            </b-progress-bar>
          </b-progress>
        </div> -->
      </div>
    </div>
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
            <p
              v-if="checkAnswerCorrectness && questionAnswered"
              class="question-card__score-transition"
            >
              +100!
            </p>
          </transition> -->
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
import Swal from 'sweetalert2';
import '@lottiefiles/lottie-player';
import floating from 'floating.js';
import FlipCard from './FlipCard.vue';
import Countdown from './Countdown.vue';
import store from '../store';

export default {
  components: {
    FlipCard,
    Countdown,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    speedMatters: {
      type: Boolean,
      default: false,
    },
    isGame: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      question: {},
      selectedAnswer: '',
      questionAnswered: false,
      currentLevel: 0,
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },
      timerBonus: 100,
      value: 0,
      max: 100,
      restartTimer: false,
      timerStopped: false,
      questionAnsweredCorrect: 0,
    };
  },
  computed: {
    ...mapActions(['setNextQuestion', 'incrementScore']),
    ...mapState(['questions', 'user', 'timeIsUp', 'userScore']),
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
      return 'Παρακαλώ διάλεξε τη σωστή απάντηση:';
    },
    answerButtonText() {
      return 'OK';
    },
    nextButtonText() {
      return 'Επόμενη ερώτηση';
    },
    calculateLevel() {
      return Math.floor(this.userScore / 100);
    },
    getLevelCongratsText() {
      let text = 'Ανέβηκες επίπεδο! Συγχαρητήρια!';
      if (this.currentLevel === 1) {
        text = 'Wow👏🏻✅ μόλις πέρασες την πρώτη πίστα👍🏻';
      } else if (this.currentLevel === 2) {
        text = ' Υπέροχα!! Έφτασες κιόλας στη δεύτερη πίστα 💪🏻! Συνέχισε έτσι👩🏼‍🏫';
      } else if (this.currentLevel === 3) {
        text = 'Γιούπι 🎊!! Είσαι στην πίστα 3📍';
      }

      return text;
    },
  },
  watch: {
    id() {
      this.getQuestion(this.id);
      this.getQuestionAnswered(this.user.id, this.id);
    },
  },
  mounted() {
    this.getQuestion(this.id);
    this.currentLevel = this.calculateLevel;
    // this.startTimer();

    // this.unwatch = this.$store.watch(
    //   (state, getters) => getters.status,
    //   (newValue, oldValue) => {
    //     // eslint-disable-next-line no-console
    //     console.log(`Updating from ${oldValue} to ${newValue}`);

    //     // Do whatever makes sense now
    //     if (newValue === 'success') {
    //       this.complex = {
    //         deep: 'some deep object',
    //       };
    //     }
    //   },
    // );

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SET_TIME_IS_UP') {
        // Do whatever makes sense now
        if (state.timeIsUp === true) {
          this.answerClick();
        }
      }
      if (mutation.type === 'SET_USER') {
        // Do whatever makes sense now
        if (state.user.id) {
          this.getQuestionAnswered(this.user.id, this.id);
        }
      }
    });
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
    getQuestionAnswered(userId, questionId) {
      const path = `/api/user/questions/answered/${userId}/${questionId}`;
      axios.get(path)
        .then((res) => {
          if (res.data.questions_answered
            && res.data.questions_answered[0]
            && res.data.questions_answered[0].times_correct) {
            this.questionAnsweredCorrect = res.data.questions_answered[0].times_correct;
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    answerClick() {
      this.questionAnswered = true;
      this.timerStopped = true;
      if (this.checkAnswerCorrectness) {
        const pointsDecreased = this.questionAnsweredCorrect * 10;
        let scoreIncrease = 100;
        if (scoreIncrease >= pointsDecreased) {
          scoreIncrease -= pointsDecreased;
        } else {
          scoreIncrease = 10;
        }
        store.dispatch('incrementScore', scoreIncrease);
        if (scoreIncrease === 100) {
          floating({
            content: '<a style="">💯</a>',
            number: 3,
            duration: 3,
            repeat: 1,
            size: 5,
            direction: 'normal',
          });
        }
        this.storeAnsweredQuestion(true);
        this.checkLevelChange();
      } else {
        this.storeAnsweredQuestion(false);
      }
    },
    nextQuestion() {
      store.dispatch('setNextQuestion', this.isGame);
      store.dispatch('setTimeIsUp', false);
      this.questionAnswered = false;
      this.selectedAnswer = '';
      this.restartTimer = !this.restartTimer;
      this.timerStopped = false;
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
    displayLevelChangeAlert() {
      Swal.fire({
        icon: 'success',
        title: this.getLevelCongratsText,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    checkLevelChange() {
      const level = this.calculateLevel;
      if (level > this.currentLevel) {
        this.currentLevel = level;
        this.displayLevelChangeAlert();
      }
    },
    // startTimer() {
    //   const timerBonus = setInterval(() => {
    //     this.value += 5;
    //     this.timerBonus -= 5;
    //     if (this.value >= 100) clearInterval(timerBonus);
    //   }, 150);
    // },
  },
};
</script>

<style>
.question-card__question{
  background-color: beige!important;
  padding: 10px 10px 10px 10px;
}

.question-card__answer-correct{
  background-color: #37B890!important;
}

.question-card__answer-wrong{
  background-color: #E04026!important;
}

.question-card__score-transition {
  text-align: center;
}

.question-card__timer {
  justify-content: center;
  display: flex;
}

.animate__animated.animate__bounceOutUp {
  animation-duration: 2s;
  text-align: center;
}

</style>
