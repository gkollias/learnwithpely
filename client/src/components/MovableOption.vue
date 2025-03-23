<template>
  <div class="">
    <div class="movableContainer">
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
      >
        <span>{{ text }}</span>
      </Moveable>
    </div>
  </div>
</template>

<script>
import 'es6-promise/auto';
import { mapActions, mapState } from 'vuex';
import Moveable from 'vue-moveable';

export default {
  components: {
    Moveable,
  },
  props: {
    text: {
      type: String,
      default: 'Movable Component',
    },
    canMove: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    moveable: {
      draggable: false,
      origin: false,
    },
    states: {
    },
    currentState: 'draggable',
  }),
  computed: {
    ...mapActions(['setQuestions', 'setNextQuestion']),
    ...mapState(['questions', 'currentQuestionId']),
  },
  watch: {
    currentState(newState) {
      this.clearAllStates();
      this.moveable[newState] = true;
    },
  },
  created() {
    if (this.canMove) {
      // eslint-disable-next-line no-console
      this.moveable.draggable = true;
    }
  },
  methods: {
    handleDrag({ target, transform }) {
      console.log('target:', target.style.transform, 'transform:', transform);
      // eslint-disable-next-line no-param-reassign
      target.style.transform = transform;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto:100&display=swap");
html,
body {
  font-family: "Open Sans", sans-serif;
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  color: #333;
  letter-spacing: 1px;
  background: #f5f5f5;
  font-weight: 300;
}

a {
  text-decoration: none;
  color: #333;
}

.movableContainer {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.moveable {
  font-family: "Roboto", sans-serif;
  position: relative;
  width: 100px;
  height: 50px;
  text-align: center;
  font-size: 40px;
  margin: 0 auto;
  font-weight: 100;
  letter-spacing: 1px;
}

.moveable span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.description {
  text-align: center;
}

.buttons.able {
  margin-top: 16px;
}
.buttons.able a {
  min-width: auto;
  padding: 8px 20px;
}
.buttons {
  text-align: center;
  margin: 0;
  padding: 10px;
}

.buttons a {
  position: relative;
  text-decoration: none;
  color: #333;
  border: 1px solid #333;
  padding: 12px 30px;
  min-width: 100px;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  margin: 5px;
  transition: all ease 0.5s;
}

.buttons a:hover,
.buttons a.selected {
  background: #333;
  color: #fff;
}
</style>
