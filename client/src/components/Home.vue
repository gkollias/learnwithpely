<template>
  <div class="landing_wrap">
    <dx-header />
    <dxIntro />
    <QuestionsClass />
    <!-- <dx-service /> -->
    <!-- <dx-priceTable /> -->
    <dx-team />
    <dx-faq />
    <dx-contact />
    <dxFooter />
  </div>
</template>
<script>

import intro from './intros/introFive.vue';
import QuestionsClass from './QuestionsClass.vue';
// import service from './service/serviceTwo.vue';
// import priceTable from './price/priceTwo.vue';
import team from './team/team.vue';
import faq from './faq/faq.vue';
import Header from './common/Header.vue';
import Footer from './common/Footer.vue';
import Contact from './common/contact.vue';

export default {
  metaInfo: {
    bodyAttrs: {
      class: ['landing-gradient-slight-ocean'],
    },
  },
  components: {
    dxHeader: Header,
    dxFooter: Footer,
    dxContact: Contact,
    dxIntro: intro,
    QuestionsClass,
    // dxService: service,
    // dxPriceTable: priceTable,
    dxTeam: team,
    dxFaq: faq,
  },
};
</script>
