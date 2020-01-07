<template lang="pug">
article.illustration
  transition(name="fade-in")
    .inner(v-if="ready")
      template(v-if="illustration")
        router-link(v-bind:to="{ name: 'index' }")
          img(v-bind:src="illustrationPath")
        .illustration-meta
          p.title {{ title }}
          ul.links(v-if="links")
            li.link(v-for="link in links")
              a(v-bind:href="link") {{ link }}
      template(v-else)
        router-link(v-if="ready" v-bind:to="{ name: 'index' }")
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

  > .inner
    padding 8px 16px
    width 1280px

  img
    width 1280px

.illustration-meta
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

    > .inner
      padding 2vw 3vw
      width 94vw

    img
      width 94vw
</style>