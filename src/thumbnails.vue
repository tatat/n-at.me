<style lang="stylus">
.illustrations
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
  padding 16px

  &:after
    content ""
    display block
    width 0
    height 0
    clear both

a.thumbnail
  float left
</style>

<template lang="pug">
article.illustrations
  h1 illustration
  .thumbnails
    .inner
      h2 original
      component(is="thumbnail", v-for="data in original", v-bind:data="data")
      h2 copyright
      component(is="thumbnail", v-for="data in copyright", v-bind:data="data")
      h2 friend
      component(is="thumbnail", v-for="data in friend", v-bind:data="data")
      h2 graffiti
      component(is="thumbnail", v-for="data in graffiti", v-bind:data="data")
</template>

<script>
"use strict";

import IllustrationRepository from 'repositories/illustration';
import ThumbnailComponent from 'thumbnail.vue';

export default {
  data() {
    return {
      original: IllustrationRepository.selectByCategory('original').reverse(),
      copyright: IllustrationRepository.selectByCategory('copyright').reverse(),
      friend: IllustrationRepository.selectByCategory('friend').reverse(),
      graffiti: IllustrationRepository.selectByCategory('graffiti').reverse(),
    };
  },

  mounted() {
    this.subtitle = null;
  },

  components: {
    thumbnail: ThumbnailComponent,
  },
};
</script>
