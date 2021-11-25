import Vue from 'vue'
import App from './App.vue'
import router from './router.js';
import { store } from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseDialogSearch from './components/ui/BaseDialogSearch.vue';
import axios from 'axios';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

Vue.config.productionTip = false
config.autoAddCss = false

library.add(faMagnifyingGlass)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('base-card', BaseCard);
Vue.component('base-button', BaseButton);
Vue.component('base-badge', BaseBadge);
Vue.component('base-spinner', BaseSpinner);
Vue.component('base-dialog', BaseDialog);
Vue.component('base-dialog-search', BaseDialogSearch);

Vue.prototype.$http = axios;



new Vue({
  store: store,
  render: h => h(App),
  router: router
}).$mount('#app')
