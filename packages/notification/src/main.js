import Vue from 'vue'
import Main from './main.vue' // 引入组件

const NotificationConstructor = Vue.extend(Main) // 构建组件类

let instance  // 接收实例化组件的变量

const Notification = function(options) {
  // 实例化组件
  instance = new NotificationConstructor({
    data: options
  })
  
  // 组件挂载
  instance.$mount()
  document.body.appendChild(instance.$el)
  
}

// 暴露挂载的方法 然后在全局main.js中将 Notification 方法挂载到Vue原型对象上面
export default Notification