import Node from './node'
export default class TreeStore {
  constructor(options) {
    this.currentNode = null
    this.currentNodeKey = null
    // 子节点列表
    // this.childNodes = []

    // 获取所有选项 赋值同样属性给当前 TreeStore 实例: data
    for (let item in options) {
      if (Object.prototype.hasOwnProperty.call(options, item)) {
        this[item] = options[item]
      }
    }
    // 子节点map id: Object
    this.nodesMap = {}

    // 实例化 Node 对象 root => Node对象
    this.root = new Node({
      data: this.data, // data => 总数据
      store: this
    })

  }

  // 注册 node 
  registerNode(node) {
    const key = this.key; // store.key
    if (!key || !node || !node.data) return;

    // 将node填充至 nodesMap node.key: node
    const nodeKey = node.key;
    if (nodeKey) this.nodesMap[node.key] = node;
  }
}