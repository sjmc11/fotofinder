<template>
    <div id="app" class="pb-12">
        <AppHeader/>
        <router-view></router-view>
    </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
export default {
  name: 'app',
  components: { AppHeader },
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
