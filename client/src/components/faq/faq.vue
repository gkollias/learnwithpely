<template>
  <section
    id="faqs-wrap"
    class="faqs-wrap p-t-b-80"
  >
    <b-container>
      <div class="row" />

      <b-row>
        <b-col
          md="6"
          sm="12"
          class="mb-4 mb-lg-0 mb-md-0 mb-4"
        >
          <div class="section-header mb-5">
            <h2 class="font-weight-bold">
              Συχνές ερωτήσεις
            </h2>
            <p>
              Παρακάτω μπορείτε να βρείτε μία λίστα συχνών ερωτήσεων για το site μας.
              Αν δεν σας καλύπτει κάποια απο αυτές, παρακαλώ επικοινωνήστε μαζί μας!
            </p>
          </div>
          <div role="tablist">
            <b-card
              no-body
              class="mb-4 o-hidden"
            >
              <b-card-header
                header-tag="header"
                class="p-3"
                role="tab"
              >
                <b-button
                  v-b-toggle.accordion-1
                  block
                  href="#"
                  variant="bg-transparent"
                  class="font-weight-700 text-14"
                >
                  Ποιά είναι τα ωφέλη μάθησης μέσω του site σας?
                </b-button>
              </b-card-header>
              <b-collapse
                id="accordion-1"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>{{ text[0] }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card
              no-body
              class="mb-4 ul-card__border-radius"
            >
              <b-card-header
                header-tag="header"
                class="p-3 "
                role="tab"
              >
                <b-button
                  v-b-toggle.accordion-2
                  block
                  href="#"
                  variant="bg-transparent"
                  class="font-weight-700 text-14"
                >
                  Πως κερδίζω πόντους?
                </b-button>
              </b-card-header>
              <b-collapse
                id="accordion-2"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>{{ text[1] }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-col>
        <!-- end of col -->
        <b-col
          md="5"
          class="offset-md-1 col-sm-12 d-flex align-items-center"
        >
          <img
            src="@/assets/images/landing/svg/faqs2.svg"
            class="img-responsive w-100"
            alt
          >
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
export default {
  data() {
    return {
      text: [`
          Παίζω και μαθαίνω!
        `, `
          Κερδίζεις 10 πόντους ανά ερώτηση.
        `],
    };
  },
};
</script>
<style scoped>
</style>
