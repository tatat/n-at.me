<style lang="stylus">
.illustration
  display table
  width 100%
  min-height 600px

  > .inner
    padding 0 16px
    display table-cell
    vertical-align middle
    text-align center
</style>

<template lang="pug">
article.illustration
  .inner
    transition(name="fade-in")
      router-link(v-bind:to="{name: 'thumbnails'}", v-if="ready")
        img(v-if="data", v-bind:src="illustration_path")
        .not-found(v-else) Not found
</template>

<script>
"use strict";

import IllustrationRepository from 'repositories/illustration';
import IllustrationMixin from 'mixins/illustration_mixin';

export default {
  mixins: [IllustrationMixin],

  data() {
    return {
      ready: false,
    }
  },

  mounted() {
    this.ready = true;
    this.subtitle = this.data ? this.data.title : 'Not found';
  },

  computed: {
    data() {
      return IllustrationRepository.findById(this.$route.params.id);
    },

    illustration_path() {
      return this.illustration_path_for(this.data);
    }
  },
};
</script>
