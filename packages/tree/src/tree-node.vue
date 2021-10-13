<template>
  <div class="rm-tree-node">
    <!-- 此级div -->
    <div class="rm-tree-node__content">
      <input type="checkbox"
             v-if="showCheckbox">
      <span class="arrow"
            v-if="node.childNodes && node.childNodes.length > 0"
            @click="handleExpandIconClick"></span>
      <span class="rm-tree-node__label title"> {{ node.data.label }} </span>
    </div>
    <!-- 子级div -->
    <div class="rm-tree-node__children"
         v-show="expanded"
         v-for="child in node.childNodes"
         :style="{'padding-left': 10 * node.level + 'px'}"
         :key="child.id">
      <rm-tree-node :node="child"
                    :key="child.id"
                    :showCheckbox="showCheckbox" />
    </div>
  </div>
</template>

<script>
// 展示的数据

export default {
  name: 'RmTreeNode',
  props: {
    // node 对象
    node: {
      type: Object,
      default: () => { }
    },
    props: {}, // 选项
    // 是否显示勾选框
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      root: null,
      store: null,
      expanded: false, // 是否展开当前节点

    }
  },
  methods: {
    handleExpandIconClick() {
      this.expanded = !this.expanded
    }
  },
  created() {
    if (this.node.expanded) {
      this.expanded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.rm-tree-node {
  white-space: nowrap;
  outline: 0;
  .rm-tree-node__content {
    line-height: 36px;
    height: 36px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .rm-tree-node__children {
    overflow: hidden;
    background-color: transparent;
  }
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

.title {
  font-size: 12px;
  font-weight: normal;
  display: flex;
  align-items: center;
}
.arrow {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-left: 5px solid #999;
  display: block;
}
.text {
  display: block;
}
.children {
  padding: 0 20px;
}
</style>