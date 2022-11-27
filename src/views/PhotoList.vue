<template lang="html">
    <div id="photo-list" class="columns-2 md:columns-3 lg:columns-4 xl:columns-6 gap-x-4">
      <PhotoElement class="mb-4 cursor-zoom-in" :photo="photo" v-for="photo in photos" :key="photo.id"/>
    </div><!-- end grid -->
  <!-- would typically put pagination inside this component then prop/emit to parent to perform API request so contained in a neat parent component wrapper -->
</template>

<script>
import PhotoElement from '../components/PhotoElement'

export default {
  name: 'PhotoList',

  components: {
    PhotoElement
  },

  props: {
    photos: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
