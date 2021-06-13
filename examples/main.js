import Vue from 'vue'
import App from './App.vue'
import rmui from "../packages"

Vue.config.productionTip = false

Vue.use(rmui)

new Vue({
  render: h => h(App),
}).$mount('#app')
