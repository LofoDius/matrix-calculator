import Vue from 'vue'
import App from '@/App.vue'
import Vuex from 'vuex'
import mutations from '@/vuex/mutations'
import getters from '@/vuex/getters'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cells: {},
    firstMatrix: [],
    secondMatrix: [],
    isFirstMatrixSaved: false,
    isSecondMatrixSaved: false,
    firstMatrixLastCell: '',
    secondMatrixLastCell: ''
  },
  mutations: mutations,
  getters: getters
})

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')