<template>
  <div class="landing_wrap">
    <dx-header />
    <dxIntro />
    <!-- <div class="container">
      <span>Vue Moveable</span>
      <div class="target">
        Target
      </div>
      <button @click="toggleDraggable">
        Toggle {{ draggable }}
      </button>
      <Moveable
        :target="['.target']"
        :draggable="draggable"
        :throttle-drag="1"
        :edge-draggable="false"
        :start-drag-rotate="0"
        :throttle-drag-rotate="0"
        @drag="onDrag"
      />
    </div> -->
    <QuestionsClass />
    <GamesCarousel />
    <!-- <dx-priceTable /> -->
    <dx-team />
    <dx-faq />
    <dx-contact />
    <dxFooter />
  </div>
</template>
<script>

// import Moveable from 'vue-moveable';
import intro from './intros/introFive.vue';
import QuestionsClass from './QuestionsClass.vue';
import GamesCarousel from './games/gamesCarousel.vue';
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
    GamesCarousel,
    // dxPriceTable: priceTable,
    dxTeam: team,
    dxFaq: faq,
    // Moveable,
  },
  data() {
    return {
      draggable: true,
    };
  },
  methods: {
    onDrag(e) {
      e.target.style.transform = e.transform;
    },
    toggleDraggable() {
      this.draggable = !this.draggable;
    },
  },
};
</script>

<style>

.description {
  padding: 10px;
}
.root {
  position: relative;
}

.target {
  position: relative;
  width: 100px;
  height: 100px;
  top: 150px;
  left: 100px;
  line-height: 100px;
  text-align: center;
  background: #ee8;
  color: #333;
  font-weight: bold;
  border: 1px solid #333;
  box-sizing: border-box;
}
.target1 {
  left: 120px;
  top: 120px;
}
.target2 {
  left: 300px;
  top: 140px;
}
.target3 {
  left: 180px;
  top: 250px;
}
</style>
