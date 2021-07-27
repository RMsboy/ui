<template>
  <div>
    <rm-button type="primary" size="medium"  @click.native="openNotification">通知</rm-button>
    <rm-button type="warning" @click.native="cloesNotif">关掉</rm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: '',
      notifi: null,
    }
  },
  methods: {
    // 调用全局的notification
    openNotification() {
      this.notifi = this.$notification({
        message: '这段时间有些累',
        title: '最近如何？',
        position: 'top-right',
        onClose: function() {
          console.log('今天是个好日子')
        }
      })
    },
    cloesNotif() {
      this.notifi.close()
    },
    changeInput(e) {
      console.log(e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>