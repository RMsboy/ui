<template>
  <button
    class="rm-button"
    @click="handleClick"
    :disabled="buttonDisabled"
    :class="[
      type ? 'rm-button--' + type : '',
      buttonSize ? 'rm-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
  >
    <span><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: "RmButton",
  props: {
    type: {
      type: String,
      default: "default",
    },
    size: String,
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean,
  },
  computed: {
    buttonSize() {
      return this.size;
    },
    buttonDisabled() {
      return this.disabled;
    },
  },
  methods: {
    handleClick(eve) {
      this.$emit("click", eve);
    },
  },
};
</script>
 
<style scoped lang="scss">
@import "../../theme-chalk/mixins/mixins.scss";

.rm-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: $--button-default-background-color;
  border: $--border-base;
  border-color: $--button-default-border-color;
  color: $--button-default-font-color;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;

  // 默认尺寸
  @include button-size(
    $--button-padding-vertical,
    $--button-padding-horizontal,
    $--button-font-size,
    $--button-border-radius
  );
}

// button type
.rm-button--primary {
  color: #fff;
  background-color: $--color-primary;
  border-color: $--color-primary;
}
.rm-button--success {
  color: #fff;
  background-color: $--color-success;
  border-color: $--color-success;
}
.rm-button--info {
  color: #fff;
  background-color: $--color-info;
  border-color: $--color-info;
}
.rm-button--warning {
  color: #fff;
  background-color: $--color-warning;
  border-color: $--color-warning;
}
.rm-button--danger {
  color: #fff;
  background-color: $--color-danger;
  border-color: $--color-danger;
}

.rm-button--medium {
  @include button-size(
    $--button-medium-padding-vertical,
    $--button-medium-padding-horizontal,
    $--button-medium-font-size,
    $--button-medium-border-radius
  );
}
.rm-button--small {
  @include button-size(
    $--button-small-padding-vertical,
    $--button-small-padding-horizontal,
    $--button-small-font-size,
    $--button-small-border-radius
  );
}
.rm-button--mini {
  @include button-size(
    $--button-mini-padding-vertical,
    $--button-mini-padding-horizontal,
    $--button-mini-font-size,
    $--button-mini-border-radius
  );
}

.is-plain {
  &,
  &:hover,
  &:focus {
    background-color: $--color-white;
    border-color: $--button-disabled-border-color;
    color: $--button-disabled-font-color;
  }
}
.is-round {
  border-radius: 20px;
}
.is-circle {
  border-radius: 50%;
}
.is-disabled,
.is-disabled:hover,
.is-disabled:focus {
  // border-color: transparent;
  color: #c0c4cc;
  background-color: #fff;
  border-color: #ebeef5;
  cursor: no-drop;
}
</style>
