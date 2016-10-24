"use strict";

import Vue from 'vue';
import VueRouter from 'vue-router';
import config from 'config';

Vue.use(VueRouter);

export const router = new VueRouter({
  history: config.history,
  routes: [],
});
