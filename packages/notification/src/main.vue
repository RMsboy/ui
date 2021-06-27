<template>
  <transition name="el-notification-fade">
    <div v-show="visible"
         class="el-notification"
         @mouseenter="clearTimer()"
         @mouseleave="startTimer()"
         @click="click">
      <span>{{message}}</span>
      <span>{{title}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      message: "",
      title: "",
      duration: 1500,
      visible: true, // 消息 是否可见
      onClose: null, // 关闭的回调函数
      timer: null, // 关闭的定时器
      closed: false, // 是否已关闭
      onClick: null, // 点击消息的回调
    }
  },
  watch: {
    closed(val) {
      // 已经关闭
      if (val) {
        this.visible = false
        // 监听css过渡后，触发销毁事件
        // this.$el.addEventListener("transitionend", this.destroyElement)
        this.destroyElement()
      }
    }
  },
  methods: {
    /**
     * 开始关闭计时
     */
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          // 如果没有关闭，调用关闭方法
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    /**
     * 清除关闭计时
     */
    clearTimer() {
      clearTimeout(this.timer)
    },
    /**
     * 关闭通知
     */
    close() {
      this.closed = true
      // 关闭后调用 关闭回调
      if (typeof this.onClose === "function") {
        this.onClose()
      }
    },
    // 点击消息的回调
    click() {
      if (typeof this.onClick === "function") {
        this.onClick()
      }
    },
    /**
     * 键盘点击事件
     */
    keydown(e) {
      // 删除、退格 取消计时
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer()
      } else if (e.keyCode === 27) {
        // esc 关闭消息
        if (!this.closed) {
          this.close()
        }
      } else {
        // 其他按键 重新计时
        this.startTimer()
      }
    },
    /**
     * 销毁当期实例
     */
    destroyElement() {
      // 移除监听事件、元素
      // this.$el.removeEventListener("transitionend", this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

  },
  mounted() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        // 如果没有关闭，调用关闭方法
        if (!this.closed) {
          this.close()
        }
      }, this.duration)
    }
    // 监听键盘事件
    document.addEventListener("keydown", this.keydown)
  },
  destroyed() {
    // 清掉键盘事件
    document.removeEventListener("keydown", this.keydown)
  },
}
</script>
<style lang="scss" scoped>
.el-notification-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }

  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}

.el-notification-fade-leave-active {
  opacity: 0;
}

.el-notification {
  width: 150px;
  height: 85px;
  background-color: rgb(117, 206, 218);
}
</style>