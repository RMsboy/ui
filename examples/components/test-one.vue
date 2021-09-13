<template>
  <div>
    <rm-button type="primary" size="medium" @click.native="openNotification"
      >通知</rm-button
    >
    <rm-button type="warning" @click.native="cloesNotif" icon="info"
      >关掉</rm-button
    >
    <rm-icon class="rm-icon-share share"></rm-icon>
    <rm-input
      v-model="val"
      clearable
      type="input"
      maxlength="30"
      show-word-limit
      :autosize="{ minRows: 2, maxRows: 4 }"
      suffixIcon="rm-icon-goods"
    >
      <template slot="prepend">Http://</template>
    </rm-input>
    <rm-tree :data="treeArr"></rm-tree>
  </div>
</template>

<script>
export default {
  name: "yifan",
  data() {
    return {
      val: "",
      notifi: null,
      treeArr: [
        {
          label: "一级1",
          children: [
            {
              label: "二级1-2",
              children: [
                {
                  label: "三级1-3",
                  children: [],
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
    };
  },
  methods: {
    // 调用全局的notification
    openNotification() {
      this.notifi = this.$notification({
        message: "这段时间有些累",
        title: "最近如何？",
        position: "top-right",
        onClose: function () {
          console.log("今天是个好日子");
        },
      });
    },
    cloesNotif() {
      this.notifi.close();
    }
  },
};
</script>
<style lang="scss" scoped>
.share {
  display: block;
  font-size: 32px;
  margin-bottom: 15px;
  color: #606266;
}
</style>