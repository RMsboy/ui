<template>
  <div>
    <rm-button @click.native="openNotification">这是一个漂亮的button</rm-button>
  </div>
</template>

<script>
export default {
  methods: {
    // 调用全局的notification
    openNotification() {
      this.$notification()
    }
  }
}
</script>
