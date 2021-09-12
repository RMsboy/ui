import RmInput from './src/input.vue'
// console.log('会执行吗', '是的')
// 按需引入时，提供 install 方法
RmInput.install = function(Vue) {
  Vue.component(RmInput.name, RmInput)
}

export default RmInput