<template>
  <div>
    <NavigationBar />
    <div>
        <b-img :src="getIconUrl()" fluid alt="Fluid-grow image"></b-img>
    </div>

    <div class='d-flex flex-wrap justify-content-between align-content-center ml-auto'>
      <Cloud classQuestion="Α"/>
      <Cloud classQuestion="Β"/>
      <Cloud classQuestion="Γ"/>
    </div>
  </div>
</template>

<script>

import Cloud from './Cloud.vue';
import NavigationBar from './NavigationBar.vue';

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  components: {
    Cloud,
    NavigationBar,
  },
  methods: {
    getIconUrl() {
      // eslint-disable-next-line global-require
      const url = require('../assets/images/LearnwithPely.png');
      return url;
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 0px 0 0;
}
a {
  color: #42b983;
}
</style>
