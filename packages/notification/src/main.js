import Vue from 'vue'
import Main from './main.vue' // 引入组件

const NotificationConstructor = Vue.extend(Main) // 构建组件类

let instance // 接收实例化组件的变量
let instances = [] // 实例数组
let seed = 1 // 实例唯一标识

const Notification = function (options) {

  const id = 'notification_' + seed++
  const position = options.position || 'top-right'; // 显示位置
  let verticalOffset = options.offset || 0 // 偏移数值

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
  instances.filter(item => item.position == position).forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })

  verticalOffset += 16
  instance.verticalOffset = verticalOffset

  instances.push(instance)

  return instance
}

Notification.close = function (id, userOnClose) {
  let index = -1
  let len = instances.length
  // 找到对应的实例
  const obj = instances.filter((item, i) => {
    if (item.id === id) {
      index = i
      return true
    } else {
      return false
    }
  })[0]

  if (!obj) return

  if (typeof userOnClose === 'function') {
    userOnClose(obj)
  }
  instances.splice(index, 1)

  if (len <= 1) return;
  const position = obj.position;
  const removedHeight = obj.dom.offsetHeight;
  for (let i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[obj.verticalProperty] = parseInt(instances[i].dom.style[obj.verticalProperty], 10) - removedHeight - 16 + 'px';
    }
  }
}


Notification.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i++) {
    instances[i].close()
  }
}

// 暴露挂载的方法 然后在全局main.js中将 Notification 方法挂载到Vue原型对象上面
export default Notification