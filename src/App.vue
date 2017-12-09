<template lang="pug">
.root
  header
    .inner
      h1
        router-link(v-bind:to="{name: 'index'}") {{ title }}

  #content
    .inner
      router-view

  footer
    .inner
      nav
        ul
          li
            a(href="https://twitter.com/__________t_t_") Twitter
          li
            a(href="https://pixiv.me/tatat") Pixiv
          li
            a(href="https://tataaat.deviantart.com/") deviantART
          li
            a(href="https://soundcloud.com/tataaat") SoundCloud
          li
            a(href="https://github.com/tatat") GitHub
          li
            a(href="https://gist.github.com/tatat") Gist
          li
            a(href="#", @click.prevent="mailto") E-mail
          li
            a(href="./images/banner.png") Banner

      small.copyright &copy; 2017 tatあt
</template>

<script>
export default {
  name: 'app',

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SET_TITLE' || mutation.type === 'SET_SUB_TITLE') {
        let title = state.title

        if (state.subTitle)
          title = `${ state.subTitle } - ${ title }`

        document.title = title
      }
    })
  },

  computed: {
    title() {
      return this.$store.getters.title
    }
  },

  methods: {
    mailto() {
      const username = 'ioiioioloo'
      const domain = 'gmail.com'

      location.href = `mailto:${username}@${domain}`
    }
  }
}
</script>

<style src="../node_modules/normalize.css"></style>
<style src="./app.styl" lang="stylus"></style>
<style lang="stylus" scoped>
.root > header > .inner,
.root > footer > .inner
  padding 8px 16px

.root > header
  h1
    font-size 140%
    margin 0

    a:hover
      text-decoration none

.root > footer
  text-align right

  nav
    display inline-block

  ul
    padding 0
    margin 0

  li
    display inline-block
    margin-left 16px

  small
    margin-left 16px
</style>
