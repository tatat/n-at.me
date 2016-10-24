"use strict";

import Vue from 'vue';
import { Repository } from 'repository';
import App from 'app.vue';
import config from 'config';

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue(App).$mount('#doc');
});
