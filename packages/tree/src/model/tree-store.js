import Node from './node'
export default class TreeStore {
  constructor(options) {
    this.currentNode = null
    this.currentNodeKey = null

    this.childNodes = []

    // 获取所有选项 赋值同样属性给当前 TreeStore 实例
    for(let item in options) {
      if(Object.prototype.hasOwnProperty.call(options, item)) {
        this[item] = options[item]
      }
    }

    // 实例化 Node 对象
    this.root = new Node({
      data: this.data,
      store: this
    })
  }
}