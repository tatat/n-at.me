<template lang="pug">
article.illustrations
  h1 illustrations
  .thumbnails
    .inner
      template(v-for="category in categories")
        .tile
          h2 {{ category }}
        .tile(
          v-for="illustration in illustrationsByCategory(category)"
          key="illustration.primary_key"
        )
          Thumbnail(v-bind:illustration="illustration")
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
  display flex
  flex-direction row
  flex-wrap wrap
  margin-left -10px
  margin-top -10px

.tile
  width 120px
  height 120px
  margin-left 10px
  margin-top 10px

@media screen and (max-width: 541px)
  h2
    width 30vw
    height 30vw
    line-height 30vw

  .thumbnails > .inner
    padding 2vw 3vw
    margin-left -2vw
    margin-top -2vw

  .tile
    width 30vw
    height 30vw
    margin-left 2vw
    margin-top 2vw
</style>