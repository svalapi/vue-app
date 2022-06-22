import Vue from 'vue';
import VModal from 'vue-js-modal';
// Required until Cypress supports fetch API
// https://github.com/cypress-io/cypress/issues/95
import 'whatwg-fetch';
import VueScrollTo from 'vue-scrollto';
import Vuelidate from 'vuelidate';
import ProductZoomer from 'vue-product-zoomer';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App/App.vue';
import router from './router/index';
import store from './store';
import apolloProvider from './apollo';
import i18n from './i18n/i18n';
import sunriseConfig from '../sunrise.config';
import './registerServiceWorker';
import './assets/scss/main.scss';
import { locale } from './components/common/shared';
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places', // necessary for places input
    language: locale(this),
  },
});
Vue.config.productionTip = false;
Vue.use(VueScrollTo);
Vue.use(VModal);
Vue.use(Vuelidate);
Vue.use(ProductZoomer);
Vue.use(VueCompositionAPI);
Vue.directive('vpshow', {
  /* eslint-disable no-param-reassign */
  bind(el, binding) {
    el.$onScroll = function onScroll() {
      binding.value(el);
    };
    document.addEventListener('scroll', el.$onScroll);
  },

  inserted(el) {
    el.$onScroll();
  },

  unbind(el) {
    document.removeEventListener('scroll', el.$onScroll);
    delete el.$onScroll;
  },
  /* eslint-enable no-param-reassign */
});

Vue.prototype.$sunrise = sunriseConfig;

new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
