<template>
  <div>
      test
      <!-- <b-img v-bind="imageProps" :src="getIconUrl" fluid alt="Responsive image"></b-img> -->
  </div>
</template>

<script>


export default {
  props: {
    classQuestion: String,
  },
  components: {
  },
  data() {
    return {
      imageProps: {
        width: 175,
        height: 175,
        class: 'imgClass',
      },

    };
  },
  computed: {
    getIconUrl() {
      // eslint-disable-next-line global-require
      const url = require('../assets/images/cloud.svg');
      return url;
    },
  },
  methods: {
  },
  created() {
  },
};
</script>

<style scoped>
.imgClass {
}
</style>
