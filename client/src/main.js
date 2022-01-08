import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import vueSmoothScroll from 'vue2-smooth-scroll';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import store from './store';
import App from './App.vue';
import router from './router';
import {
  domainDev, clientIdDev, domainProd, clientIdProd,
} from '../auth_config.json';
// Import the plugin here
import { Auth0Plugin } from './auth';
import VueLand from './plugins/Vueland.kit';

let domain;
let clientId;
if (process.env.NODE_ENV === 'production') {
  domain = domainProd;
  clientId = clientIdProd;
} else {
  domain = domainDev;
  clientId = clientIdDev;
}
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

Sentry.init({
  Vue,
  dsn: 'https://e85943a9bd274f388571331c25e4ab99@o1110639.ingest.sentry.io/6139785',
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

// eslint-disable-next-line no-restricted-globals
if (location.protocol !== 'https:' && location.href.indexOf('localhost') === -1) {
  // eslint-disable-next-line no-restricted-globals
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
