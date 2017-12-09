<template lang="pug">
article.illustration
  transition(name="fade-in")
    .inner(v-if="ready")
      template(v-if="illustration")
        router-link(v-bind:to="{ name: 'index' }")
          img(v-bind:src="illustrationPath")
        .illustration-meta
          p.title {{ title }}
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.illustration
  display table
  width 100%
  min-height 600px

  > .inner
    padding 8px 16px
    display table-cell
    vertical-align middle
    text-align center

.illustration-meta
  text-align left

  .title
    font-weight bold
</style>