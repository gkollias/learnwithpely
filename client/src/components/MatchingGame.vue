<template>
  <div class="page main">
    <!-- <MoveableOption text="test1" />
    <MoveableOption
      text="test2"
      :can-move="false"
    /> -->
    <KanbanStyle />
  </div>
</template>

<script>
import 'es6-promise/auto';
import { mapActions, mapState } from 'vuex';
// import MoveableOption from './MovableOption.vue';
import KanbanStyle from './KanbanStyle.vue';

export default {
  components: {
    // MoveableOption,
    KanbanStyle,
  },
  props: {
    gameId: {
      type: String,
      default: '0',
    },
  },
  data: () => ({
    moveable: {
      draggable: true,
      origin: false,
    },
    states: {
    },
    currentState: 'scalable',
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
  },
  methods: {
    handleDrag({ target, transform }) {
      // eslint-disable-next-line no-console
      console.log('onDrag', transform);
      // eslint-disable-next-line no-param-reassign
      target.style.transform = transform;
    },
  },
};
</script>

<style lang="scss">

</style>
