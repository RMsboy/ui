<template>
  <div class="rm-button">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'RmButton',
  props: {
    type: String
  }
}
</script>
 
<style scoped lang="scss">
  .rm-button {
      display: inline-block;
      padding: 3px 6px;
      background: $sky;
      color: #fff;
  }
</style>
