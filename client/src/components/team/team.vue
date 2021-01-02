<template>
  <section
    id="teams-wrap"
    class="team-wrap p-t-b-80 light-gray"
  >
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="section-header mb-5"
        >
          <h2 class="font-weight-bold">
            Γνωρίστε την ομάδα μας
          </h2>
          <p>
            Είμαστε οι υπεύθυνοι πίσω απο αυτή την προσπάθεια.
            Μη διστάσετε να επικοινωνήσετε μαζί μας.
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="(member, key) in members"
          :key="key"
          md="6"
          lg="3"
          sm="6"
          class="  mb-4 mb-lg-0 "
        >
          <b-card class="card-profile-1">
            <div class="text-center">
              <div class="avatar box-shadow-2 mb-3">
                <img
                  :src="member.profile_pic"
                  alt=""
                >
              </div>
              <h5 class="font-weight-medium card-title m-0">
                {{ member.name }}
              </h5>
              <p class="mt-0">
                {{ member.job }}
              </p>
              <p>{{ member.desc }}</p>
              <button
                class="btn half-button btn-gradient"
                @click="href='mailto:' + member.email"
              >
                Contact
              </button>
              <!-- <div class="card-socials-simple mt-4">
                <a
                  href=""
                  class="text-20 mr-2"
                >
                  <i class="eva eva-twitter twitter" />
                </a>
                <a
                  href=""
                  class="text-20 mr-2"
                >
                  <i class="eva eva-google google" />
                </a>
                <a
                  href=""
                  class="text-20 mr-2"
                >
                  <i class="eva eva-facebook facebook" />
                </a>
              </div> -->
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>

const george = require('../../assets/images/faces/george.webp');
const pely = require('../../assets/images/faces/pely.webp');

export default {
  data() {
    return {
      members: [
        {
          name: 'Pely Korre',
          job: 'Head Teacher/ Product Manager',
          desc: '',
          email: 'pelagiakorre@gmail.com',
          profile_pic: pely,
        },
        {
          name: 'George Kollias',
          job: 'Software Engineer',
          desc: '',
          email: 'gkollias13@gmail.com',
          profile_pic: george,
        },
      ],
    };
  },
};
</script>
