<template>
  <transition name="el-notification-fade">
    <div v-show="visible"
         class="el-notification"
         @mouseenter="clearTimer()"
         @mouseleave="startTimer()"
         @click="click">
      <i class="el-notification__icon"></i>
      <div class="el-notification__group"
           >
        <h2 class="el-notification__title"
            v-text="title"></h2>
        <div class="el-notification__content"
             v-show="message">{{message}}
        </div>
        <div class="el-notification__closeBtn el-icon-close"
             @click.stop="close"></div>
      </div>
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
        this.$el.addEventListener("transitionend", this.destroyElement)
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
      this.$el.removeEventListener("transitionend", this.destroyElement)
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
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  overflow: hidden;
  .el-notification__title {
    font-weight: 700;
    font-size: 16px;
    color: #303133;
    margin: 0;
  }
.el-notification__content {
    font-size: 14px;
    line-height: 21px;
    margin: 6px 0 0;
    color: #606266;
    text-align: justify;
}
.el-notification__closeBtn {
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
    color: #909399;
    font-size: 16px;
}
}
</style>