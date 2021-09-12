import Vue from 'vue'
import App from './App.vue'
import rmui from "../packages"
import router from './router'
// 引入全局的组件挂载到Vue原型上
import notification from '../packages/notification/index'
import RmTree from './../packages/tree/'

Vue.prototype.$notification = notification

Vue.config.productionTip = false

Vue.use(rmui)
// 尝试按需引入
Vue.use(RmTree)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
