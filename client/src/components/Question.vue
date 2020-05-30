<template>
  <div>
    <div class="flip-container">
      <div class="" :id='elementId' v-if="question">
        <div class="front">
          <b-card
            :title="question.question"
            :img-src="question.image_url"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
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
        </div>
        <div class="back">
          <b-card
            :title="question.question"
            :img-src="question.image_url"
            img-top
            tag="article"
            :class="answerImageStyle"
            class="mb-2"
          >
            <b-card-text>
              {{ question.answer }}
            </b-card-text>
            <b-button variant="primary">Next</b-button>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: String,
  },
  data() {
    return {
      question: {},
      selectedAnswer: '',
      elementId: '',
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },

    };
  },
  computed: {
    answerImageStyle() {
      return this.checkAnswerCorrectness ? 'imgCorrectAnswerClass' : 'imgWrongAnswerClass';
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
      document.querySelector(`#${this.elementId}`).classList.toggle('flipper');
      document.querySelector(`#${this.elementId}`).classList.toggle('back');
    },
  },
  created() {
    this.elementId = `question_${this.id}`;
    this.getQuestion(this.id);
  },
};
</script>

<style scoped>
.imgClass {
  background-color:dimgrey;
}

/* entire container, keeps perspective */
.flip-container {
  perspective: 1000px;
}
  /* flip the pane when hovered */
.flip-container:hover .flipper, .flip-container.hover .flipper, .flip-container.flip .flipper {
  transform: rotateY(180deg);
}

.flip-container, .front, .back {
  width: 200px;
  height: 540px;
}

/* flip speed goes here */
.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
}

/* hide back of pane during swap */
.front, .back {
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
}

/* front pane, placed above back */
.front {
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
}

/* back, initially hidden pane */
.back {
  transform: rotateY(180deg);
}

.imgCorrectAnswerClass {
  background:green;
}

.imgWrongAnswerClass {
  background:red;
}
</style>
