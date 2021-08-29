// 注意：rm-input 组件由input、textarea两种原生标签组成，且并没有使用 :value="value" 的形式绑定值，而是直接使用 computed.nativeInputValue 包装 props.value 值
//值改变 emit 派发事件，初始化时，使用 computed.nativeInputValue 赋值给 input、textarea 两种原生标签的值

<template>
  <div :class="[type === 'textarea' ? 'rm-textarea' : 'rm-input',
  {'rm-input-group': $slots.prepend || $slots.append,
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
             ref="input"
             :maxlength="$attrs.maxlength"
             class="rm-input__inner"
             @input="handleInput"
             @change="handleChange"
             @compositionstart="handleCompositionStart"
             @compositionupdate="handleCompositionupdate"
             @compositionend="handleCompositionend">
      <!-- 后置内容 一般放icon -->
      <span class="rm-input__suffix"
            v-if="getSuffixVisible()">
        <span class="rm-input__suffix-inner">
          <template>
            <slot name="suffix"></slot>
            <rm-icon v-if="suffixIcon"
                     class="rm-input__icon"
                     :class="suffixIcon"></rm-icon>
          </template>
          <rm-icon v-if="clearable && value"
                   class="rm-icon-circle-close rm-input__icon"
                   @click="clear"></rm-icon>
          <rm-icon v-if="showPassword"
                   class="rm-icon-view rm-input__icon"
                   @click.native="changePasswordVisible"></rm-icon>
          <span v-if="isWordLimitVisible"
                class="rm-input__count">
            <span class="rm-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
      </span>
      <!-- 后置元素 一般放按钮、标签-->
      <div class="rm-input-group__append"
           v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea v-else
              ref="textarea"
              class="rm-textarea__inner"
              @input="handleInput"
              :maxlength="$attrs.maxlength"
              @change="handleChange"
              @compositionstart="handleCompositionStart"
              @compositionupdate="handleCompositionupdate"
              @compositionend="handleCompositionend"
              :style="textareaStyle">
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'"
          class="rm-input__count">{{textLength}}/{{upperLimit}}</span>
  </div>
</template>

<script>
import merge from 'src/utils/merge'
import calcTextareaHeight from './calcTextareaHeight'

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
    // 是否根据文本内容自动调整 可传入行相关
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    // 使用字数限制
    showWordLimit: {
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
      textareaCalcStyle: {}, // textarea 样式对象 通过 autosize 的行数计算高度
      isComposing: false, // 是否在输入法编辑器 编辑状态 （如：中文等） 
    }
  },
  mounted() {
    console.log(this.$attrs)
    // 设置 input 组件的值为传入的 value
    this.setNativeInputValue()
    // 为 textare 时计算高度
    this.resizeTextarea()
  },
  watch: {
    value() {
      // 计算 textarea 高度
      this.$nextTick(this.resizeTextarea);
    },
    nativeInputValue() {
      // 传入的原始值改变，将值同步到 input\textarea 标签里
      this.setNativeInputValue()
    }
  },
  computed: {
    // 计算 textarea 的样式
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize })
    },
    // input 原始值
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    // 显示字数限制?
    isWordLimitVisible() {
      return this.showWordLimit
    },
    // 字数限制上限
    upperLimit() {
      // this.$attrs => 父组件传给子组件，但子组件 props 没有接收的数据
      return this.$attrs.maxlength
    },
    // 当前 value 长度
    textLength() {
      return this.value.length
    },
    // 超过最大限制长度 ?
    inputExceed() {
      return this.isWordLimitVisible && (this.textLength > this.upperLimit)
    }
  },
  methods: {
    // type为password时，切换显示模式
    changePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
    },
    // 计算 textarea 时计算高度
    resizeTextarea() {
      // eslint-disable-next-line no-debugger
      if (this.type != 'textarea') return

      let { autosize } = this
      // 没有传入 autosize 对象时, 设置默认最小高度
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)

    },
    // textarea input事件 e.data => 当前一次改变值 e.target.value => 当前框的值（累计）
    handleInput(e) {
      // 输入法编辑中 不派发事件
      if (this.isComposing) return;
      // 值 == 传进来的原始值 不派发
      if (this.nativeInputValue === e.target.value) return
      this.$emit('input', e.target.value)
    },
    // 派发 change 事件
    handleChange(event) {
      console.log('change事件', event.target.value)
      this.$emit('change', event.target.value);
    },
    // 中文输入法 开始事件
    handleCompositionStart() {
      this.isComposing = true
    },
    // 中文输入法 编辑、改变事件
    handleCompositionupdate() {
      console.log('update')
    },
    // 中文输入法 关闭事件
    handleCompositionend(e) {
      this.isComposing = false
      // 输入法关闭时，input 事件比 compositionend 触发早，导致 handleInput return 掉没有派发input事件出去
      // 此处手动触发一次 input 事件
      this.handleInput(e)
    },
    // 点击清空
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear', '')
    },
    // 将原生标签的 value 设置为 传入的 原始值
    setNativeInputValue() {
      let input = this.$refs.input || this.$refs.textarea
      if (!input) return
      if (input.value === this.nativeInputValue) return
      input.value = this.nativeInputValue
    },
    // 后置内容是否显示
    getSuffixVisible() {
      return this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible
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
  // 字数长度计算
  .rm-input__count {
    height: 100%;
    display: inline-flex;
    align-items: center;
    color: #909399;
    font-size: 12px;
    .rm-input__count-inner {
      background: #fff;
      line-height: normal;
      display: inline-block;
      padding: 0 5px;
    }
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
.rm-input__prefix {
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

.rm-textarea {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
  .rm-textarea__inner {
    width: 100%;
  }
  .rm-input__count {
    color: #909399;
    background: #fff;
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    right: 10px;
  }
}
</style>