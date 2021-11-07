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

  [SET_SELECTED_CLASS_ID](state, selectedClassId) {
    // eslint-disable-next-line no-param-reassign
    state.selectedClassId = selectedClassId;
  },

  [SET_SELECTED_CATEGORY_ID](state, selectedCategoryId) {
    // eslint-disable-next-line no-param-reassign
    state.selectedCategoryId = selectedCategoryId;
  },

  [SET_SELECTED_SUBCATEGORY_ID](state, selectedSubcategoryId) {
    // eslint-disable-next-line no-param-reassign
    state.selectedSubcategoryId = selectedSubcategoryId;
  },

  [SET_SELECTED_CHAPTER_ID](state, selectedChapterId) {
    // eslint-disable-next-line no-param-reassign
    state.selectedChapterId = selectedChapterId;
  },

  [SET_SELECTED_GAME_ID](state, selectedGameId) {
    // eslint-disable-next-line no-param-reassign
    state.selectedGameId = selectedGameId;
  },
};
