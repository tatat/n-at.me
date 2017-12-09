const getValueOf = (object, key) => object != null ? object[key] : null

export default {
  computed: {
    id() {
      return getValueOf(this.illustration, 'primary_key')
    },

    title() {
      return getValueOf(this.illustration, 'title')
    },

    thumbnailPath() {
      return getValueOf(this.illustration, 'thumbnail_image_path')
    },

    illustrationPath() {
      return getValueOf(this.illustration, 'image_path')
    }
  }
}