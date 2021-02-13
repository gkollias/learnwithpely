<template>
  <!-- contact form start -->
  <section
    id="contacts-wrap"
    class="contact-form-wrap light-gray p-t-b-80"
    anchor="contacts-wrap"
  >
    <b-container>
      <b-row>
        <b-col
          md="6"
          class="form-wrap mb-4"
        >
          <div class="section-header mb-5 ">
            <h2 class="font-weight-bold ">
              Eπικοινώνησε μαζί μας
            </h2>
            <p>
              Έχεις κάποια απορία? Στείλτη μας!
            </p>
          </div>
          <div
            v-if="successfullySent"
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <button
              type="button"
              class="close"
              @click="closeInfo"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <strong>Your Message Sent succefully</strong>
          </div>

          <form
            class="row form"
            role="form"
            @submit.prevent="sendEmail"
          >
            <div class="form-group mb-4 col-md-6">
              <label for="">
                <i class="eva eva-person-outline" />
              </label>
              <input
                id="user_name"
                type="text"
                name="user_name"
                class="form-control"
                placeholder="Το όνομά σου"
                required
              >
            </div>
            <div class="form-group mb-4 col-md-6">
              <label for="">
                <i class="eva eva-email-outline" />
              </label>
              <input
                type="user_email"
                required
                name="user_email"
                class="form-control"
                placeholder="Το email σου"
                aria-describedby="helpId"
              >
            </div>
            <div class="form-group mb-4 col-md-12">
              <label for="">
                <i class="eva eva-edit-2-outline" />
              </label>
              <input
                type="text"
                required
                name="subject"
                class="form-control"
                placeholder="Το θέμα της ερώτησής σου"
                aria-describedby="helpId"
              >
            </div>

            <div class="form-group mb-4 col-md-12">
              <label for="">
                <i class="eva eva-edit-outline" />
              </label>
              <textarea
                class="form-control"
                placeholder="Το μήνυμά σου"
                required
                name="message"
                rows="5"
              />
            </div>

            <div class="form-group  col-md-12">
              <button
                type="submit"
                class="btn btn-block half-button form-submit-button btn-large btn-gradient"
              >
                Αποστολή μυνήματος
              </button>
            </div>
          </form>
        </b-col>
        <div class="col-md-6 align-items-center">
          <div class="right-contact-wrap ml-5">
            <img
              src="@/assets/images/landing/svg/contact2.svg"
              class="img-responsive zoom-fade"
              alt="Image"
            >

            <!-- <div class="address-wrap mb-4">-->
          </div>
        </div>
      </b-row>
    </b-container>
  </section>

  <!-- contact form end -->
</template>

<script>
import emailjs from 'emailjs-com';

// init('user_rSSzFCqty0p8h0RwkAxpL');

export default {
  data() {
    return {
      emailSent: false,
    };
  },
  computed: {
    successfullySent() {
      return this.emailSent;
    },
  },
  methods: {
    sendEmail(e) {
      emailjs.sendForm('service_nfeno1b', 'template_vat1qjn', e.target, 'user_rSSzFCqty0p8h0RwkAxpL')
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('SUCCESS!', result.status, result.text);
          this.emailSent = true;
          setTimeout(() => {
            this.emailSent = false;
          }, 3000);
        }, (error) => {
          // eslint-disable-next-line no-console
          console.log('FAILED...', error);
        });
    },
    closeInfo() {
      this.emailSent = false;
    },
  },
};
</script>
