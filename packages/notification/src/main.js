import Vue from 'vue'
import Main from './main.vue' // 引入组件

const NotificationConstructor = Vue.extend(Main) // 构建组件类

let instance  // 接收实例化组件的变量
let instances = [] // 实例数组
let seed = 1 // 实例唯一标识

const Notification = function(options) {

  const id = 'notification_' + seed++
  let verticalOffset = options.offset || 0 // 偏移数值
  const position = options.position || 'top-right'; // 显示位置

  // 实例化组件
  instance = new NotificationConstructor({
    data: options
  })
  instance.id = id
  console.log('看哈是个啥', instance)
  // 组件挂载在body
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  
  // 计算位置
  instance.position = position

  instances.filter(item => item.position == position).forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })

  verticalOffset += 16
  instance.verticalOffset = verticalOffset

  instances.push(instance)

  return instance
}

Notification.close = function() {
  
}


Notification.closeAll = function() {
  for(let i = instances.length - 1; i >= 0; i++) {
  }
}

// 暴露挂载的方法 然后在全局main.js中将 Notification 方法挂载到Vue原型对象上面
export default Notification