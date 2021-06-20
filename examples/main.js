import Vue from 'vue'
import App from './App.vue'
import rmui from "../packages"
// 引入全局的组件挂载到Vue原型上
import notification from '../packages/notification/index'

Vue.prototype.$notification = notification

Vue.config.productionTip = false

Vue.use(rmui)

new Vue({
  render: h => h(App),
}).$mount('#app')
