<template>
  <div>
    <rm-button @click.native="openNotification">通知</rm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: ''
    }
  },
  methods: {
    // 调用全局的notification
    openNotification() {
      this.$notification({
        message: '这段时间有些累',
        title: '最近如何？',
        onClose: function() {
          console.log('今天是个好日子')
        }
      })
    },
    changeInput(e) {
      console.log(e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>