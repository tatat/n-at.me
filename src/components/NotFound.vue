<template lang="pug">
article.errors
  .inner
    h1
      router-link(v-bind:to="{ name: 'index' }") Not found
</template>

<script>
export default {
  mounted() {
    this.$store.commit('SET_SUB_TITLE', { subTitle: 'Not found' })
  }
}
</script>

<style lang="stylus" scoped>
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