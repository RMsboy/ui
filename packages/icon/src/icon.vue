<template>
  <i :class="'rm-icon-' + name"></i>
</template>

<script>
export default {
  name: "RmIcon",

  props: {
    name: String,
  }
};
</script>