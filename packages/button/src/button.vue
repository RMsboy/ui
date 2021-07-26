<template>
  <div class="rm-button" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "RmButton",
  props: {
    type: String,
  },
  methods: {
    handleClick(eve) {
      this.$emit("click", eve);
    },
  },
};
</script>
 
<style scoped lang="scss">
.rm-button {
  width: 100px;
  height: 60px;
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
</style>
