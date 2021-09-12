
import RmTree from "./src/tree.vue"

// 按需引入时，提供 install 方法
RmTree.install = function(Vue) {
  Vue.component(RmTree.name, RmTree)
}

export default RmTree