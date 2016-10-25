<style lang="stylus">
a.thumbnail,
a.thumbnail > .inner,
a.thumbnail .placeholder
  position relative
  display block
  width 120px
  height 120px
  overflow hidden

a.thumbnail:hover
  > .inner
    opacity 1

  .placeholder
    opacity 0

a.thumbnail > .inner
  background-position 0 0
  opacity 0.1
  transition opacity 0.5s linear 0s

a.thumbnail
  .loading
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index 9
    background-position center center
    background-image url(/images/loading.gif)
    background-repeat no-repeat
    background-color #000000
    opacity 0.6

  .placeholder
    background-position 120px 0
    text-indent 100%
    white-space nowrap
    opacity 1
    transition opacity 0.2s linear 0.3s
</style>

<template lang="pug">
a.thumbnail(@click.prevent="on_click", v-bind:data-id="id", v-bind:data-source-path="illustration_path")
  .loading(v-if="loading")
  .inner(v-bind:style="thumbnail_style")
    .placeholder(v-bind:style="thumbnail_style") {{title}}
</template>

<script>
"use strict";

import ImagePreloader from 'image_preloader';
import IllustrationMixin from 'mixins/illustration_mixin';

export default {
  mixins: [IllustrationMixin],

  props: ['data'],

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    id() {
      return this.id_for(this.data);
    },

    title() {
      return this.data.title;
    },

    thumbnail_path() {
      return this.thumbnail_path_for(this.data);
    },

    illustration_path() {
      return this.illustration_path_for(this.data);
    },

    thumbnail_style() {
      return {backgroundImage: `url(${this.thumbnail_path})`};
    },

  },

  methods: {
    on_click() {
      this.loading = true;

      new ImagePreloader(this.illustration_path).load().then(() => {
        this.loading = false;
        this.$router.push({name: 'illustration', params: {id: this.id_for(this.data)}});
      });
    }
  },
};
</script>
