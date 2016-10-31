"use strict";

import Vue from 'vue';
import App from 'app.vue';

const sharedState = {
  title: 'n_at',
};

Vue.mixin({
  data() {
    return {
      shared_state: sharedState,
    };
  },

  computed: {
    title: {
      set(title) {
        document.title = title;
      },
      get() {
        return document.title;
      }
    },

    subtitle: {
      set(subtitle) {
        if (subtitle == null) {
          this.title = this.shared_state.title;
        } else {
          this.title = `${subtitle} - ${this.shared_state.title}`;
        }
      },
    },
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue(App).$mount('#doc');
});
