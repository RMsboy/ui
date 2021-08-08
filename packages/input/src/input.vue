<template>
  <div class="rm-input">
    <input :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
           :disabled="disabled"
           :value="value"
           @input="$emit('input', $event.target.value)">
    <span class="icon-box">
      <rm-icon v-if="clearable && value"
               class="rm-icon-circle-close close-icon"
               @click.native="$emit('input', '')"></rm-icon>
      <rm-icon v-if="showPassword" class="rm-icon-view password-icon"
               @click.native="changePasswordVisible"></rm-icon>
    </span>

  </div>
</template>

<script>
export default {
  name: "RmInput",
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: Boolean || String,
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否为密码框
    showPassword: {
      type: Boolean,
      default: false
    },
    type: String,
  },
  data() {
    return {
      passwordVisible: false, // type为password 密码内容是否可见
    }
  },
  methods: {
    // type为password时，切换显示模式
    changePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.rm-input {
  width: 180px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
  input {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 30px 0 15px;
  }
  .icon-box {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -20px;
    display: flex;
    justify-content: flex-end;
    .close-icon,
    .password-icon {
      margin: 0 2px;
      font-size: 14px;
      color: #d5e1e1;
      &:hover {
        color: #606266;
      }
    }
  }
}
</style>