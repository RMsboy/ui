<template>
  <!-- <div>
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
          <rm-tree-node v-if="item.isShow && item.children" :data="item.children" />
        </div>
      </div>
    </template>
  </div> -->
  <div class="rm-tree-node">
    <h1 class="title">
      <span
        class="arrow"
        v-if="node.childNodes && node.childNodes.length > 0"
      ></span>
      <span class="text"> {{ node.data.label }} </span>
    </h1>
    <div class="children" v-for="child in node.childNodes" :key="child.id">
      <rm-tree-node
        v-if="node.childNodes && node.childNodes.length > 0"
        :data="child"
      />
    </div>
  </div>
</template>

<script>
// 展示的数据
const treeArr = [
  {
    label: "一级1",
    children: [
      {
        label: "二级1-2",
        children: [
          {
            label: "三级1-3",
            children: [
              {
                label: '四级1-4',
                children: []
              }
            ],
          },
        ],
      },
    ],
  },
  {
    label: "一级2",
    children: [
      {
        label: "二级2-2",
        children: [
          {
            label: "三级2-3",
            children: [],
          },
        ],
      },
    ],
  }
]

export default {
  name: 'RmTreeNode',
  props: {
    // node 对象
    node: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    const newData = JSON.parse(JSON.stringify(treeArr));
    newData.forEach((item) => {
      item.isShow = false;
    })
    return {
      root: null,
      store: null,
      list: newData,
    }
  },
  methods: {
    showAction(index) {
      if (this.list[index].children && this.list[index].children.length > 0) {
        this.list[index].isShow = !this.list[index].isShow;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rm-tree-node {
  white-space: nowrap;
  outline: 0;
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