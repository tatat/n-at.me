<style src="../node_modules/normalize.css/normalize.css"></style>
<style src="./app.styl" lang="stylus"></style>

<template lang="pug">
.root
  #content
    .inner
      router-view
</template>

<script>
"use strict";

import { router } from 'routes';

export default {
  router,
};
</script>
