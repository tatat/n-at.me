"use strict";

import Vue from 'vue';
import VueRouter from 'vue-router';
import config from 'config';
import ThumbnailsComponent from 'thumbnails.vue';
import IllustrationComponent from 'illustration.vue';
import NotFoundComponent from 'not_found.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  history: config.history,
  routes: [
    {path: '/', name: 'thumbnails', component: ThumbnailsComponent},
    {path: '/i/:id:ext(\\.html)?', name: 'illustration', component: IllustrationComponent},
    {path: '*', name: 'not_found', component: NotFoundComponent},
  ],
});