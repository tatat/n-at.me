<template lang="pug">
a.thumbnail(@click.prevent="onClick", v-bind:data-id="id", v-bind:data-source-path="illustrationPath")
  .loading(v-if="loading")
  .inner(v-bind:style="thumbnailStyle")
    .placeholder(v-bind:style="thumbnailStyle") {{ title }}
</template>

<script>
import IllustrationMixin from '@/mixins/illustration_mixin'
import ImagePreloader from '@/lib/image_preloader'

export default {
  mixins: [ IllustrationMixin ],

  props: [ 'illustration' ],

  data() {
    return {
      loading: false
    }
  },

  computed: {
    thumbnailStyle() {
      return { backgroundImage: `url(${ this.thumbnailPath })` }
    }
  },

  methods: {
    onClick() {
      this.loading = true

      new ImagePreloader(this.illustrationPath).load().then(() => {
        this.loading = false
        this.$router.push({ name: 'illustration', params: { id: this.id } })
      }).catch(error => {
        this.loading = false
        throw error
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
a.thumbnail
a.thumbnail > .inner,
a.thumbnail .placeholder
  position relative
  display block
  width 120px
  height 120px

a.thumbnail:hover
  > .inner
    opacity 1

  .placeholder
    opacity 0

a.thumbnail
  float left
  margin-left 10px
  margin-top 10px
  border-radius 5%
  overflow hidden

  > .inner, .placeholder
    background-repeat no-repeat
    background-size 240px 120px

  > .inner
    background-position 0 0
    opacity 0.1
    transition opacity 0.4s linear 0s

  .loading
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index 9
    background-position center center
    background-image url(/images/loading.svg)
    background-repeat no-repeat
    background-size 48px 48px
    background-color #000
    opacity 0.6

  .placeholder
    overflow hidden
    background-position -120px 0
    text-indent 100%
    white-space nowrap
    opacity 1
    transition opacity 0.4s ease-in 0.2s
</style>