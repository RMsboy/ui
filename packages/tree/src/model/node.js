

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

        // 获取所有选项 赋值同样属性给当前 Node 实例
        for (let item in options) {
            if (Object.prototype.hasOwnProperty.call(options, item)) {
                this[item] = options[item]
            }
        }

        // internal 
        this.level = 0;
        this.childNodes = [];

        if(this.parent) {
            this.level = this.parent.level + 1
        }
    }
}