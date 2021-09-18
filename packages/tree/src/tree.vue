<template>
  <div class="rm-tree">
    <rm-tree-node
      v-for="child in root.childNodes"
      :key="child.id"
      :node="child"
    ></rm-tree-node>
    <div class="el-tree__empty-block" v-if="!data || data.length === 0">
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
    },
    // 配置的参数 
    props: {
      default() {
        return {
          children: 'children',
          label: 'label',
          disabled: 'disabled'
        };
      }
    },
  },
  data() {
    return {}
  },
  methods: {
  },
  created() {
    this.store = new TreeStore({
      data: this.data,
      props: this.props,
    })

    // root => node 实例对象
    this.root = this.store.root
  }
}
</script>

<style lang="scss" scoped>
.rm-tree {
  cursor: default;
  background: #fff;
  // border: 1px solid #d1dbe5;
}
</style>