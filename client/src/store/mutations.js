import {
  SET_USER,
  SET_QUESTIONS,
  SET_NEXT_QUESTION,
  SHOW_QUESTIONS,
  SET_SCORE,
  INCREMENT_SCORE,
  SET_TIME_IS_UP,
} from './mutation-types';

export default {
  [SET_USER](state, user) {
    // eslint-disable-next-line no-param-reassign
    state.user = user;
  },
  [SET_QUESTIONS](state, questions) {
    // eslint-disable-next-line no-param-reassign
    state.questions = questions;
  },
  [SET_NEXT_QUESTION](state, id) {
    // eslint-disable-next-line no-param-reassign
    state.currentQuestionId = id;
  },
  [SHOW_QUESTIONS](state, show) {
    // eslint-disable-next-line no-param-reassign
    state.showQuestions = show;
  },

  [SET_SCORE](state, score) {
    // eslint-disable-next-line no-param-reassign
    state.userScore = score;
  },

  [INCREMENT_SCORE](state, score) {
    // eslint-disable-next-line no-param-reassign
    state.userScore += score;
  },

  [SET_TIME_IS_UP](state, timeIsUp) {
    // eslint-disable-next-line no-param-reassign
    state.timeIsUp = timeIsUp;
  },
};
