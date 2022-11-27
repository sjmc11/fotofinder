<template>
    <div id="app" class="pb-12 relative">
        <AppHeader/>
        <router-view></router-view>
        <BackgroundBlobs/>
    </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import BackgroundBlobs from '@/components/layout/BackgroundBlobs'
export default {
  name: 'app',
  components: { BackgroundBlobs, AppHeader },
  mounted () {
    // No longer needed - taken care of in router logic.
    // if (!this.$root.client_id) {
    //   this.$router.push('/auth')
    // }
  }
}
</script>

<style lang="scss">
// Include app styles
@import "./assets/scss/compiler";
</style>
