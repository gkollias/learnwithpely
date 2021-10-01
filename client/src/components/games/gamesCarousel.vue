<template>
  <section
    id="games-wrap"
    class="games-wrap light-gray"
  >
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="section-header mb-5"
        >
          <h2 class="font-weight-bold">
            Παιχνίδια
          </h2>
          <p>
            Δοκίμασε τις δυνάμεις σου με ένα από τα παιχνίδια μας!
          </p>
        </b-col>
        <b-col md="12">
          <div class="slick-work-carousel-wrap">
            <!-- carousel item start -->
            <carousel
              :autoplay="false"
              :dots="false"
              :nav="false"
              :responsive="{
                0: { items: 1, nav: true, navText: false },
                1000: { items: 4, nav: true, navText: false }
              }"
              :slide-by="4"
            >
              <div
                v-for="(game, key) in games"
                :key="key"
                class="service-wrap"
              >
                <router-link :to="classQuestionUrl('101')">
                  <div class="card o-hidden m-3">
                    <div class="card-header p-0 text-center ">
                      <img
                        class="img-responsive"
                        :src="game.gameImage"
                      >
                    </div>
                    <div class="card-body">
                      <h3 class="card-title text-capitalize font-weight-bold  ">
                        {{ game.gameName }}
                      </h3>
                      <p
                        class="card-text"
                        style="color:black"
                      >
                        {{ game.gameText }}
                      </p>
                    </div>
                    <div class="card-footer pl-3 d-flex justify-content-center">
                      <b-button
                        :href="game.gameLink"
                        variant="primary"
                      >
                        Πάμε
                      </b-button>
                    </div>
                  </div>
                </router-link>
              </div>
            </carousel>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import carousel from 'vue-owl-carousel';

const calculator = require('../../assets/images/landing/games/calculator.png');

export default {
  components: { carousel },
  data() {
    return {
      games: [
        {
          gameImage: calculator,
          gameName: 'Προπαίδεια',
          gameText:
            '2 επί 2 = 5. Ή μήπως όχι?',
          gameLink: this.classQuestionUrl('101'),
        },
        // {
        //   gameImage: calculator,
        //   gameName: 'game Eight',
        //   gameText:
        //     'Lorem ipsum dolor sit amet additional adipiscing elit Aenean commodo ligula',
        // },
      ],
    };
  },
  methods: {
    classQuestionUrl(classname) {
      return `/classQuestion/${classname}`;
    },
  },
};
</script>
