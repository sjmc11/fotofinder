<template lang="html">
    <div class="photo-element relative trans group">
        <img :src="src" :alt="alt" @click="handleImgClick" class="group-hover:brightness-50 group-hover:opacity-25 group-hover:shadow-2xl z-0 group-hover:saturate-10 trans w-full">
        <button type="button" :class="isFav(photo.id) ? 'text-red-500' : 'hidden text-zinc-600 hover:text-zinc-900'" class="group-hover:inline-flex absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-50 z-10 items-center justify-center" @click="handleToggleFavourite(photo.id)" title="Add to favourites">♥</button>
    </div>
</template>

<script>
export default {
  name: 'PhotoElement',
  props: {
    photo: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'regular'
    }
  },

  computed: {
    src () {
      // Modified to support src when displaying image from favList
      return this.photo.urls ? this.photo.urls[this.size] : this.photo.src
    },
    alt () {
      return this.photo.description
    }
    // Not required
    // btnText () {
    //   return 'like'
    // }
  },

  methods: {
    handleImgClick () {
      this.$router.push({ name: 'Photo', params: { id: this.photo.id } })
    },
    handleFavToggle (imgId) {
      console.log('Mark photo as fave: ' + imgId)
    }
  }
}
</script>
