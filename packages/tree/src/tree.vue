<template>
  <div class="rm-tree">
    <template v-for="(item, index) in list">
      <div :key="index">
        <h1 class="title" @click="showAction(index)">
          <span
            class="arrow"
            v-if="item.children && item.children.length > 0"
          ></span>
          <span class="text"> {{ item.label }} </span>
        </h1>
        <div class="children">
          <rm-tree v-if="item.isShow && item.children" :data="item.children" />
        </div>
      </div>
    </template>
    <!-- <rm-tree-node></rm-tree-node> -->
    <div class="el-tree__empty-block" v-if="!data || data.length === 0">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script>
// import RmTreeNode from './tree-node.vue'
import TreeStore from './model/tree-store'

export default {
  name: 'RmTree',
  components: {
    // RmTreeNode
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
    const newData = JSON.parse(JSON.stringify(this.data));
    newData.forEach((item) => {
      item.isShow = false;
    });
    return {
      root: null,
      store: null,
      list: newData
    }
  },
  methods: {
    showAction(index) {
      if (this.list[index].children && this.list[index].children.length > 0) {
        this.list[index].isShow = !this.list[index].isShow;
      }
    }
  },
  created() {
    this.store = new TreeStore({
      data: this.data
    })

    // root => node 实例对象
    // this.root = this.store.root
  }
}
</script>

<style lang="scss" scoped>
.rm-tree {
  cursor: default;
  background: #fff;
  // border: 1px solid #d1dbe5;
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