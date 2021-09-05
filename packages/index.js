import RmButton from './button'
import RmIcon from './icon'
import RmAlert from './alert'
import RmInput from './input'
import RmTree from './tree'

const components = [
  RmButton,
  RmIcon,
  RmAlert,
  RmInput,
  RmTree
]

// 提供给 Vue.use 的 install 方法 使用Vue.use 引入的话，会引入所有的组件
const install = function(Vue) {
  if(install.installed) return
  components.map(item => {
    Vue.component(item.name, item)
  })
}

// 判断是否直接
if(typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

export default {
  install
}