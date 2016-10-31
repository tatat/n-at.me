<style lang="stylus">
article.errors
  display table
  width 100%
  height 600px

  > .inner
    display table-cell
    text-align center
    vertical-align middle

  h1
    mergin 0
    font-size 100%
    font-weight normal
</style>

<template lang="pug">
article.errors
  .inner
    h1
      router-link(v-bind:to="{name: 'thumbnails'}") Not found
</template>

<script>
"use strict";

export default {
  mounted() {
    this.subtitle = 'Not found';
  },
};
</script>
