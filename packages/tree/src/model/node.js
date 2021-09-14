import objectAssign from 'src/utils/merge';
import { markNodeData } from './util';

const getPropertyFromData = function (node, prop) {
    const props = node.store.props;
    const data = node.data || {};
    const config = props[prop];

    if (typeof config === 'function') {
        return config(data, node);
    } else if (typeof config === 'string') {
        return data[config];
    } else if (typeof config === 'undefined') {
        return '';
    }
};

let nodeIdSeed = 0;
export default class Node {
    constructor(options) {

        this.id = nodeIdSeed++;
        this.text = null;
        this.checked = false;
        this.indeterminate = false;
        this.data = null;
        this.expanded = false;
        this.parent = null;
        this.visible = true;

        // 获取所有选项 赋值同样属性给当前 Node 实例: data、store
        for (let item in options) {
            if (Object.prototype.hasOwnProperty.call(options, item)) {
                this[item] = options[item]
            }
        }

        // internal 
        this.level = 0;
        this.childNodes = [];

        if (this.parent) {
            this.level = this.parent.level + 1
        }

        const store = this.store
        if (!store) {
            throw new Error('[Node]store is required!')
        }
        // 注册 node 到 store 的 nodesMap 中
        store.registerNode(this);

        // 设置 当前 node 的data
        if (store.lazy !== true && this.data) {
            this.setData(this.data);
        }

        if (!this.data) return;
        this.updateLeafState();
    }

    setData(data) {
        if (!Array.isArray(data)) {
            markNodeData(this, data);
        }

        this.data = data;
        this.childNodes = [];

        let children;
        if (this.level === 0 && this.data instanceof Array) {
            children = this.data;
        } else {
            children = getPropertyFromData(this, 'children') || [];
        }

        for (let i = 0, j = children.length; i < j; i++) {
            this.insertChild({ data: children[i] });
        }
    }

    updateLeafState() {
        if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
            this.isLeaf = this.isLeafByUser;
            return;
        }
        const childNodes = this.childNodes;
        if (!this.store.lazy || (this.store.lazy === true && this.loaded === true)) {
            this.isLeaf = !childNodes || childNodes.length === 0;
            return;
        }
        this.isLeaf = false;
    }

    insertChild(child, index) {
        if (!child) throw new Error('insertChild error: child is required.');

        if (!(child instanceof Node)) {
            objectAssign(child, {
                parent: this,
                store: this.store
            });
            child = new Node(child);
        }

        child.level = this.level + 1;

        if (typeof index === 'undefined' || index < 0) {
            this.childNodes.push(child);
        } else {
            this.childNodes.splice(index, 0, child);
        }

        this.updateLeafState();
    }
}
