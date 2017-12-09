<template lang="pug">
article.illustrations
  h1 illustrations
  .thumbnails
    .inner
      template(v-for="category in categories")
        h2 {{ category }}
        Thumbnail(
          v-for="illustration in illustrationsByCategory(category)"
          v-bind:illustration="illustration"
          key="illustration.primary_key"
        )
</template>

<script>
import Thumbnail from './Thumbnail';

export default {
  mounted() {
    this.$store.commit('SET_SUB_TITLE', { subTitle: null })
  },

  computed: {
    categories() {
      return this.$store.getters['illustrations/categories']
    }
  },

  methods: {
    illustrationsByCategory(category) {
      return this.$store.getters['illustrations/findAllByCategory'](category)
    }
  },

  components: {
    Thumbnail
  },
};
</script>

<style lang="stylus" scoped>
h1
  display none

h2
  display block
  width 120px
  height 120px
  float left
  overflow hidden
  margin 0
  line-height 120px
  text-align center
  font-size 105%
  transition color 0.5s linear 0s

  &:hover
    color #FFFFFF

.thumbnails > .inner
  padding 8px 16px

  &:after
    content ""
    display block
    width 0
    height 0
    clear both
</style>