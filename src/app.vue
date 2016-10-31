<style src="../node_modules/normalize.css/normalize.css"></style>
<style src="./app.styl" lang="stylus"></style>
<style lang="stylus">
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

<template lang="pug">
.root
  header
    .inner
      h1
        router-link(v-bind:to="{name: 'thumbnails'}") n_at

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
            a(href="http://www.pixiv.net/member.php?id=103059") Pixiv
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
            a(href="/images/banner.png") Banner
      small.copyright &copy; 2016 tatあt
</template>

<script>
"use strict";

import { router } from 'routes';

export default {
  router,

  methods: {
    mailto() {
      const username = 'ioiioioloo';
      const domain = 'gmail.com';

      location.href = `mailto:${username}@${domain}`;
    },
  },
};
</script>
