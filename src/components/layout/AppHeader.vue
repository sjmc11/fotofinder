<template lang="html">
  <header class="w-full text-white sticky top-0 py-5 md:py-3 lg:py-5 block z-20 bg-zinc-900/75 md:bg-zinc-900/50 border-b border-zinc-700/25 backdrop-blur-sm mb-6">
    <div class="container flex items-center gap-x-4 md:gap-x-9">
      <router-link to="/" class="mr-auto font-bold text-xs sm:text-base">FotoFinder</router-link>
      <router-link to="/" exact-active-class="text-cyan-400 hover:text-cyan-400 opacity-100" class="inline-block text-xs sm:text-base opacity-50 hover:opacity-100 trans">Discover</router-link>
      <router-link to="/faves" exact-active-class="text-cyan-400 hover:text-cyan-400 opacity-100" class="inline-block text-xs sm:text-base opacity-50 hover:opacity-100 trans">Favourites</router-link>
      <router-link to="/auth" exact-active-class="text-cyan-400 hover:text-cyan-400 opacity-100" class="inline-block text-xs sm:text-base opacity-50 hover:opacity-100 trans">Re-authorize</router-link>
    </div><!-- end container -->
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
