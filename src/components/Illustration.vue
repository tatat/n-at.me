<template lang="pug">
article.illustration
  transition(name="fade-in")
    .inner(v-if="ready")
      template(v-if="illustration")
        router-link.image(:to="{ name: 'index' }")
          img(:src="illustrationPath")
        .illustration-meta
          p.title {{ title }}
          ul.links(v-if="links")
            li.link(v-for="link in links")
              a(:href="link") {{ link }}
      template(v-else)
        router-link(v-if="ready" :to="{ name: 'index' }")
          .not-found Not found
</template>

<script>
import IllustrationMixin from '@/mixins/illustration_mixin'

export default {
  mixins: [ IllustrationMixin ],

  data() {
    return {
      ready: false
    }
  },

  metaInfo() {
    const meta = []

    if (this.illustration)
      meta.push({ name: 'thumbnail', content: this.illustration.image_path })

    return { meta }
  },

  mounted() {
    this.$store.commit('SET_SUB_TITLE', { subTitle: this.title || 'Not found' })
    this.ready = true
  },

  computed: {
    requestedId() {
      return this.$route.params.id
    },

    illustration() {
      return this.$store.getters['illustrations/findById'](this.requestedId)
    },

    links() {
      return this.illustration.links || null
    }
  }
}
</script>

<style lang="stylus" scoped>
.illustration
  display flex
  width 100%
  min-height 600px
  justify-content center
  align-items center

  > .inner
    max-width 1280px
    overflow hidden

  a.image
    display block
    box-sizing border-box
    padding 8px 16px 0 16px
    width 100%

  img
    width 100%
    display block

.illustration-meta
  padding 0 16px 8px 16px
  text-align left

  .title
    font-weight bold

  ul.links
    list-style-type none
    padding 0

    > li
      line-height 1.5em
      font-size 0.9em

      a
        overflow-wrap break-word
        word-wrap break-word


@media screen and (max-width: 541px)
  .illustration
    min-height 0

    a.image
      padding 8px 0 0 0
</style>