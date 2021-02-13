<template>
  <section
    id="features-wrap"
    class="features_wrap p-t-b-80"
  >
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="section-header mb-5"
        >
          <h2 class="font-weight-bold">
            Ερωτήσεις
          </h2>
          <p>
            Μπορείτε να επιλέξετε ερωτήσεις συμφωνα με την τάξη και
            την ενότητα του βιβλίου που βρίσκεσαι!
          </p>
        </b-col>

        <b-col
          md="12"
          lg="6"
          sm="12"
          class="mb-4 mb-lg-0"
        >
          <b-row>
            <b-col
              md="6"
              sm="6"
              class="mb-4"
            >
              <router-link :to="classQuestionUrl('1')">
                <b-card class=" text-center">
                  <i class="eva eva-edit-outline text-36" />
                  <h4 class="card-title pt-2 font-weight-medium">
                    Α' Δημοτικού
                  </h4>
                  <!-- <p>TBD</p> -->
                </b-card>
              </router-link>
            </b-col>
            <b-col
              md="6"
              sm="6"
              class="mb-4"
            >
              <router-link :to="classQuestionUrl('2')">
                <b-card class=" text-center">
                  <i class="eva eva-arrowhead-up-outline text-36" />
                  <h4 class="card-title pt-2 font-weight-medium">
                    Β' Δημοτικού
                  </h4>
                  <!-- <p>TBD</p> -->
                </b-card>
              </router-link>
            </b-col>
            <b-col
              md="6"
              sm="6"
              class="mb-4"
            >
              <router-link :to="classQuestionUrl('3')">
                <b-card class=" text-center">
                  <i class="eva eva-bar-chart-2-outline text-36" />
                  <h4 class="card-title pt-2 font-weight-medium">
                    Γ' Δημοτικού
                  </h4>
                  <!-- <p>TBD</p> -->
                </b-card>
              </router-link>
            </b-col>
            <b-col
              md="6"
              sm="6"
              class="mb-4"
            >
              <router-link :to="classQuestionUrl('4')">
                <b-card class=" text-center">
                  <i class="eva eva-grid-outline text-36" />
                  <h4 class="card-title pt-2 font-weight-medium">
                    Δ' Δημοτικού
                  </h4>
                  <!-- <p>TBD</p> -->
                </b-card>
              </router-link>
            </b-col>
            <b-col
              md="6"
              sm="6"
              class="mb-4"
            >
              <router-link :to="classQuestionUrl('5')">
                <b-card class=" text-center">
                  <i class="eva eva-pantone-outline text-36" />
                  <h4 class="card-title pt-2 font-weight-medium">
                    Ε' Δημοτικού
                  </h4>
                  <!-- <p>TBD</p> -->
                </b-card>
              </router-link>
            </b-col>
            <b-col
              md="6"
              sm="6"
              class="mb-4"
            >
              <router-link :to="classQuestionUrl('6')">
                <b-card class=" text-center">
                  <i class="eva eva-award-outline text-36" />
                  <h4 class="card-title pt-2 font-weight-medium">
                    ΣΤ' Δημοτικού
                  </h4>
                  <!-- <p>TBD</p> -->
                </b-card>
              </router-link>
            </b-col>
            <b-col
              md="6"
              sm="6"
              class="mb-4"
            >
              <router-link :to="classQuestionUrl('0')">
                <b-card class=" text-center">
                  <i class="eva eva-globe-outline text-36" />
                  <h4 class="card-title pt-2 font-weight-medium">
                    Μαθαίνω Ελληνικά
                  </h4>
                  <!-- <p>TBD</p> -->
                </b-card>
              </router-link>
            </b-col>
          </b-row>
        </b-col>
        <!-- end of col-6 -->
        <b-col
          md="12"
          sm="12"
          lg="5"
          class="offset-lg-1 d-flex align-items-center"
        >
          <img
            src="@/assets/images/landing/svg/v2-header-2.svg"
            class="img-responsive w-100"
            alt=""
          >
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    classQuestionUrl(classname) {
      return `/classQuestion/${classname}`;
    },
  },
};
</script>
