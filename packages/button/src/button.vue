<template>
  <div class="rm-button" 
    @click="handleClick"
    :class="[
    type ? 'rm-button--' + type : '',
    buttonSize ? 'rm-button--' + buttonSize : ''
    ]"
    >
    <span><slot></slot></span>
  </div>
</template>
<script>
export default {
  name: "RmButton",
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String
  },
  computed: {
    buttonSize() {
      return this.size
    }
  },
  methods: {
    handleClick(eve) {
      this.$emit("click", eve);
    },
  },
};
</script>
 
<style scoped lang="scss">
@import "../../theme-chalk/common/mixins.scss";

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
  @include button-size($--button-medium-padding-vertical, $--button-medium-padding-horizontal, $--button-medium-font-size, $--button-medium-border-radius)
}
.rm-button--small {
  @include button-size($--button-small-padding-vertical, $--button-small-padding-horizontal, $--button-small-font-size, $--button-small-border-radius);
}
.rm-button--mini {
  @include button-size($--button-mini-padding-vertical, $--button-mini-padding-horizontal, $--button-mini-font-size, $--button-mini-border-radius);
}
</style>
