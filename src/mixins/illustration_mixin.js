"use strict";

export default {
  methods: {
    id_for(data) {
      return Array.isArray(data.id) ? data.id[0] : data.id;
    },

    illustration_path_for(data) {
      return `/images/illustrations/${this.id_for(data)}.jpg`;
    },

    thumbnail_path_for(data) {
      return `/images/illustrations/${this.id_for(data)}.thumb.jpg`;
    },
  },
};
