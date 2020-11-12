import {
  SET_USER,
  SET_QUESTIONS,
  SET_NEXT_QUESTION,
  SHOW_QUESTIONS,
} from './mutation-types';

export default {
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_QUESTIONS](state, questions) {
    state.questions = questions;
  },
  [SET_NEXT_QUESTION](state, id) {
    state.currentQuestionId = id;
  },
  [SHOW_QUESTIONS](state, show) {
    state.showQuestions = show;
  },
};
