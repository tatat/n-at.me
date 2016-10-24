"use strict";

import Vue from 'vue';
import config from 'config';
import app from 'app.vue';
import { router } from 'routes';

document.addEventListener('DOMContentLoaded', () => {
  router.start(app, '#doc');
});
