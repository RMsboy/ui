<template>
  <div class="rm-tree">
    <rm-tree-node></rm-tree-node>
    <div class="el-tree__empty-block"
         v-if="!root.childNodes || root.childNodes.length === 0">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script>
import RmTreeNode from './tree-node.vue'
import TreeStore from './model/tree-store'

export default {
  name: 'RmTree',
  components: {
    RmTreeNode
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {
      root: null,
      store: null,
    }
  },
  methods: {

  },
  created() {
    this.store = new TreeStore({
      data: this.data
    })

    this.root = this.store.root
  }
}
</script>

<style lang="scss" scoped>
.rm-tree {
  cursor: default;
  background: #fff;
  border: 1px solid #d1dbe5;
}
.el-tree__empty-block {
  position: relative;
  min-height: 60px;
  text-align: center;
  width: 100%;
  height: 100%;
  .el-tree__empty-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #5e7382;
  }
}
</style>