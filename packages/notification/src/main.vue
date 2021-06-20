<template>
  <transition name="el-notification-fade">
      <div>
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
      title: ""
    }
  }
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

</style>