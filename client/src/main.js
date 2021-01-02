import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import vueSmoothScroll from 'vue2-smooth-scroll';
import store from './store';
import App from './App.vue';
import router from './router';

// Import the Auth0 configuration
import { domain, clientId } from '../auto_config.json';
// Import the plugin here
import { Auth0Plugin } from './auth';
import VueLand from './plugins/Vueland.kit';
// import on your project (less then 1KB gziped)

Vue.use(vueSmoothScroll);

Vue.use(VueLand);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
