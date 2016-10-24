"use strict";

import Vue from 'vue';
import config from 'config';
import app from 'app.vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue(app).$mount('#doc');
});
