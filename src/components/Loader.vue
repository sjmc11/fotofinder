<template lang="html">
  <div class="loader text-center">
    <span class="block mb-1">⏳</span>
    <span class="block text-xs opacity-50">Loading</span>
  </div><!-- end loader -->
</template>

<script>
import * as UserService from '../http/UserService'

export default {
  name: 'Loader'
}
</script>
