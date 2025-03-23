import axios from 'axios';
import _ from 'lodash';
import {
  SET_USER,
  SET_QUESTIONS,
  SET_NEXT_QUESTION,
  SHOW_QUESTIONS,
  SET_SCORE,
  INCREMENT_SCORE,
  SET_TIME_IS_UP,
  SET_SELECTED_CLASS_ID,
  SET_SELECTED_CATEGORY_ID,
  SET_SELECTED_SUBCATEGORY_ID,
  SET_SELECTED_CHAPTER_ID,
  SET_SELECTED_GAME_ID,
} from './mutation-types';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let gameQuestions = [];
let totalGameQuestions = 0;
const gameMaxQuestions = 10;

function getNextQuestionId(state, isGame) {
  const id = parseInt(state.currentQuestionId, 10);

  if (isGame) {
    if (totalGameQuestions > gameMaxQuestions || totalGameQuestions === state.questions.length) {
      gameQuestions = [];
      totalGameQuestions = 0;
      return 0;
    }
    let random = 0;
    while (gameQuestions.includes(random)) {
      random = getRandomInt(state.questions.length);
    }
    gameQuestions.push(random);
    totalGameQuestions += 1;

    return state.questions[random].id;
  }

  if (id === 0 && state.questions.length > 0) {
    return state.questions[0].id;
  }

  for (let i = 0; i < state.questions.length - 1; i += 1) {
    if (state.questions[i].id === id) {
      return state.questions[i + 1].id;
    }
  }

  gameQuestions = [];
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
  const path = process.env.VUE_APP_API_URL + '/api/user/info';
  axios
    .post(path, payload)
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
  const path = process.env.VUE_APP_API_URL + '/api/user/score/increment';
  axios
    .put(path, payload)
    .then(() => {})
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

  setNextQuestion({ state, commit }, isGame) {
    commit(SET_NEXT_QUESTION, getNextQuestionId(state, isGame));
  },

  setScore({ commit }, score) {
    commit(SET_SCORE, score);
  },

  incrementScore({ commit, state }, inc) {
    if (!_.isEmpty(state.user)) {
      incrementUserScore(state.user.id, inc);
    }
    commit(INCREMENT_SCORE, inc);
  },

  initNextQuestion({ state, commit }) {
    commit(SET_NEXT_QUESTION, initNextQuestionId(state));
  },

  showQuestions({ commit }, show) {
    commit(SHOW_QUESTIONS, show);
  },

  setTimeIsUp({ commit }, timeIsUp) {
    commit(SET_TIME_IS_UP, timeIsUp);
  },

  setSelectedClassId({ commit }, selectedClassId) {
    commit(SET_SELECTED_CLASS_ID, selectedClassId);
  },

  setSelectedCategoryId({ commit }, selectedCategoryId) {
    commit(SET_SELECTED_CATEGORY_ID, selectedCategoryId);
  },

  setSelectedSubcategoryId({ commit }, selectedSubcategoryId) {
    commit(SET_SELECTED_SUBCATEGORY_ID, selectedSubcategoryId);
  },

  setSelectedChapterId({ commit }, selectedChapterId) {
    commit(SET_SELECTED_CHAPTER_ID, selectedChapterId);
  },

  setSelectedGameId({ commit }, selectedGameId) {
    commit(SET_SELECTED_GAME_ID, selectedGameId);
  },
};
