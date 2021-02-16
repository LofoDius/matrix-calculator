import Vue from 'vue'
import App from '@/App.vue'
import Vuex from 'vuex'
import mutations from '@/vuex/mutations'
import getters from '@/vuex/getters'
import Notifications from 'vue-notification'
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Notifications);
Vue.use(VTooltip);

VTooltip.options.disposeTimeout = 0;
VTooltip.options.themes.tooltip.placement = 'bottom';

const store = new Vuex.Store({
  state: {
    cells: {},

    firstMatrix: [],
    firstMatrixHeight: 0,
    firstMatrixWidth: 0,
    isFirstMatrixSaved: false,
    firstMatrixLastCell: '',
    firstMatrixIsBottomClear: true,

    secondMatrix: [],
    secondMatrixHeight: 0,
    secondMatrixWidth: 0,
    isSecondMatrixSaved: false,
    secondMatrixLastCell: '',
    secondMatrixIsBottomClear: true,

    resultMatrix: [],
    resultMatrixValues: [],
    resultMatrixWidth: 0,
    resultMatrixHeight: 0,
    resultMatrixX: 0,
    resultMatrixY: 0
  },
  mutations: mutations,
  getters: getters
})

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')