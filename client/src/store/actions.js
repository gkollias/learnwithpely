import {
  SET_USER,
  SET_QUESTIONS,
  SET_NEXT_QUESTION,
  SHOW_QUESTIONS,
} from './mutation-types';


function getNextQuestionId(state) {
  const id = parseInt(state.currentQuestionId, 10);
  // eslint-disable-next-line no-console
  console.log(id);
  if (id === 0) {
    return state.questions[0].id;
  }
  for (let i = 0; i < state.questions.length - 1; i += 1) {
    if (state.questions[i].id === id) {
      return state.questions[i + 1].id;
    }
  }
  return 0;
}

export default {

  setUser({ commit }, user) {
    if (user) {
      commit(SET_USER, user);
    } else {
      commit(SET_USER, {});
    }
  },

  setQuestions({ commit }, questions) {
    commit(SET_QUESTIONS, questions);
  },

  setNextQuestion({ state, commit }) {
    commit(SET_NEXT_QUESTION, getNextQuestionId(state));
  },

  showQuestions({ commit }, show) {
    commit(SHOW_QUESTIONS, show);
  },
};
