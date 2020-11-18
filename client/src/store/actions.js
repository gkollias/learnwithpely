import axios from 'axios';
import {
  SET_USER,
  SET_QUESTIONS,
  SET_NEXT_QUESTION,
  SHOW_QUESTIONS,
  SET_SCORE,
  INCREMENT_SCORE,
} from './mutation-types';

function getNextQuestionId(state) {
  const id = parseInt(state.currentQuestionId, 10);
  // eslint-disable-next-line no-console
  // console.log(id);
  if (id === 0 && state.questions.length > 0) {
    return state.questions[0].id;
  }
  for (let i = 0; i < state.questions.length - 1; i += 1) {
    if (state.questions[i].id === id) {
      return state.questions[i + 1].id;
    }
  }
  return 0;
}

function initNextQuestionId(state) {
  if (state.questions.length > 0) {
    return state.questions[0].id;
  }
  return 0;
}

function getUserInfo(commit, user) {
  const payload = {
    email: user.email,
    name: user.name,
  };
  const path = '/api/user/info';
  axios.post(path, payload)
    .then((res) => {
      commit(SET_USER, res.data.user_info);
      commit(SET_SCORE, res.data.user_score);
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
}

function incrementUserScore(userId, increment) {
  const payload = {
    user_id: userId,
    score_increment: increment,
  };
  const path = '/api/user/score/increment';
  axios.put(path, payload)
    .then(() => {
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
}

export default {

  setUser({ commit }, user) {
    if (user) {
      getUserInfo(commit, user);
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

  setScore({ commit }, score) {
    commit(SET_SCORE, score);
  },

  incrementScore({ commit, state }, inc) {
    incrementUserScore(state.user.id, inc);
    commit(INCREMENT_SCORE, inc);
  },

  initNextQuestion({ state, commit }) {
    commit(SET_NEXT_QUESTION, initNextQuestionId(state));
  },

  showQuestions({ commit }, show) {
    commit(SHOW_QUESTIONS, show);
  },
};
