<template>
  <div :class="[type === 'textarea' ? 'rm-textarea' : 'rm-input',
  {'rm-input-group': $slots.prepend || $slots.append,
  'rm-input': true,
  'rm-input-group--append': $slots.append,
  'rm-input-group--prepend': $slots.prepend,
  'rm-input--prefix': $slots.prefix || prefixIcon,
  'rm-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword ,}
  ]">
    <!-- 不为 textarea -->
    <template v-if="type != 'textarea'">
      <!-- 前置元素 一般放按钮、标签-->
      <div class="rm-input-group__prepend"
           v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- 前置内容 一般放icon -->
      <span class="rm-input__prefix"
            v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <rm-icon v-if="prefixIcon"
                 class="rm-input__icon"
                 :class="prefixIcon"></rm-icon>
      </span>
      <input :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
             :disabled="disabled"
             class="rm-input__inner"
             :value="value"
             @input="$emit('input', $event.target.value)">
      <!-- 后置内容 一般放icon -->
      <span class="rm-input__suffix"
            v-if="$slots.suffix || suffixIcon">
        <span>
          <template>
            <slot name="suffix"></slot>
            <rm-icon v-if="suffixIcon"
                     class="el-input__icon"
                     :class="suffixIcon"></rm-icon>
          </template>
          <rm-icon v-if="clearable && value"
                   class="rm-icon-circle-close rm-input__icon"
                   @click.native="$emit('input', '')"></rm-icon>
          <rm-icon v-if="showPassword"
                   class="rm-icon-view rm-input__icon"
                   @click.native="changePasswordVisible"></rm-icon>
        </span>

      </span>
      <!-- 后置元素 一般放按钮、标签-->
      <div class="rm-input-group__append"
           v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea v-else
              :style="textareaStyle">

    </textarea>
  </div>
</template>

<script>
import merge from 'src/utils/merge'

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
    // 是否根据文本内容自动调整
    autosize: {
      type: Boolean,
      default: false
    },
    type: String,
    resize: String, // 能否被缩放
    suffixIcon: String, // 后置内容类名
    prefixIcon: String, // 前置内容类名
  },
  data() {
    return {
      passwordVisible: false, // type为password 密码内容是否可见
      textareaCalcStyle: {}, // textarea 样式对象
    }
  },
  mounted() {
    console.log(this.$slots)
  },
  computed: {
    // 计算样式
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, {'resize': this.resize})
    }
  },
  methods: {
    // type为password时，切换显示模式
    changePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
    },
    // 计算 textarea 样式
    resizeTextarea() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../theme-chalk/mixins/mixins.scss";

// rm-input
@include b(input) {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;

  .rm-input__inner {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
// 前置、后置元素
.rm-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.rm-input-group__append,
.rm-input-group__prepend {
  background-color: $--background-color-base;
  color: $--color-info;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: $--border-base;
  border-radius: $--input-border-radius;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
// 前置、后置内容

.rm-input__icon,
.el-input__prefix {
  height: 100%;
  text-align: center;
  transition: all 0.3s;
}
.rm-input__prefix {
  position: absolute;
  left: 5px;
  top: 0;
  color: #c0c4cc;
}
.rm-input__suffix {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  // pointer-events: none; 阻止元素成为鼠标事件目标
}
.rm-input__icon {
  width: 25px;
  line-height: 40px;
}
</style>