<template>
  <div>
    <b-card
      :title="title"
      :img-src="highFiveIconUrl"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2 question-card__question"
    >
      <b-card-text>
        {{ description }}
      </b-card-text>
      <b-button
        variant="primary"
        @click="goToMenu"
      >
        {{ buttonText }}
      </b-button>
    </b-card>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

import store from '../store';

const highFiveIcon = require('../assets/images/high-five.png');

export default {
  ...mapActions(['showQuestions']),
  data() {
    return {
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },
    };
  },
  computed: {
    title() {
      return 'Τέλος ερωτήσεων';
    },
    description() {
      return 'Μπράβο! Οι ερωτήσεις με τα κριτήρια που επέλεξες τελείωσαν! Παρακαλώ πάτησε το παρακάτω κουμπί για να επιστρέψεις στο κεντρικό μενού ερωτήσεων';
    },
    buttonText() {
      return 'Επιστροφή στο μενού';
    },
    highFiveIconUrl() {
      return highFiveIcon;
    },
  },
  methods: {
    goToMenu() {
      store.dispatch('showQuestions', false);
    },
  },
};
</script>

<style>
.question-card__question{
  background-color: beige!important;
  padding: 10px 10px 10px 10px;
}

</style>
