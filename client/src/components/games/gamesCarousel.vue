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
                v-for="(service, key) in services"
                :key="key"
                class="service-wrap"
              >
                <div class="card o-hidden m-3">
                  <div class="card-header p-0 text-center ">
                    <img
                      class="img-responsive"
                      :src="service.serviceImage"
                    >
                  </div>
                  <div class="card-body">
                    <h3 class="card-title text-capitalize font-weight-bold  ">
                      {{ service.serviceName }}
                    </h3>
                    <p class="card-text">
                      {{ service.serviceText }}
                    </p>
                  </div>
                  <div class="card-footer pl-3">
                    <a
                      href="#"
                      class="btn btn-lg p-1 mr-1 text-dark"
                    >
                      <span class="eva eva-link-2-outline" />
                    </a>
                  </div>
                </div>
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
      services: [
        {
          serviceImage: calculator,
          serviceName: 'Προπαίδεια',
          serviceText:
            '2 επί 2 = 5. Ή μήπως όχι?',
        },
        // {
        //   serviceImage: calculator,
        //   serviceName: 'Service Eight',
        //   serviceText:
        //     'Lorem ipsum dolor sit amet additional adipiscing elit Aenean commodo ligula',
        // },
      ],
    };
  },
};
</script>
