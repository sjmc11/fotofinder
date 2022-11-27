<template lang="html">
    <div class="auth-view w-full py-24 flex flex-col justify-center items-center fadeInDown">
      <div id="page-heading" class="block mb-6 xl:mb-9 text-center">
        <h1 class="text-xl sm:text-3xl mb-4">{{this.$root.client_id ? 'Re-authorize' : 'Authorize'}} your profile to fetch images</h1>
        <p class="font-light opacity-50 sm:text-lg">Enter your unsplash API key</p>
      </div><!-- end page heading -->
      <form action="#" @submit.prevent="onSubmit" class="relative px-6">
          <fieldset class="inline-flex flex-col sm:flex-row items-center justify-center gap-x-4 text-sm w-full">
            <div id="input-wrapper" class="relative">
              <input type="text" id="client_id" v-model="client_id" placeholder="Enter API key here" class="h-10 rounded-md focus:outline-none mb-4 sm:mb-0 pl-3 md:pl-4 pr-10 w-full sm:w-96 bg-transparent border border-zinc-700 focus:border-cyan-900">
              <span class="absolute right-4 top-2 cursor-pointer opacity-50 hover:opacity-100" @click="()=>{this.client_id = '';this.apiKeyErr = ''}">⨂</span>
            </div><!-- end input wrapper to support positioning -->
            <button type="submit" class="bg-zinc-800/50 px-3 md:px-5 rounded-md h-10 inline-flex items-center border border-zinc-700 hover:text-cyan-500 hover:bg-cyan-900/10 hover:border-cyan-900 trans">{{this.$root.client_id ? 'Re-authorize' : 'Authorize'}}</button>
          </fieldset>
          <span v-if="apiKeyErr" class="text-red-500 text-center block text-xs top-12 left fadeInDown absolute">{{apiKeyErr}}</span>
      </form><!-- ideally this form would belong in it's own component and self contain the submit method-->
      <p class="mt-12 text-xs text-neutral-500">Don't have an API key? <a href="https://unsplash.com/developers" target="_blank" class="hover:text-cyan-600 hover:underline">Get started</a>.</p>
    </div>
</template>

<script>
import PhotoElement from '../components/PhotoElement'

export default {
  name: 'AuthView',

  data () {
    return {
      client_id: this.$root.client_id,
      apiKeyErr: ''
    }
  },

  methods: {
    // Include a bit of promise based validation
    validateApiKeyInput () {
      return new Promise((resolve, reject) => {
        // Empty check
        if (!this.client_id) return reject(new Error('empty API key'))
        // Enforce beginning underscore
        if (this.client_id[0] !== '_') return reject(new Error('API key should start with "_"'))
        // Enforce a length
        if (this.client_id.length < 12) return reject(new Error('API key looks too short'))
        return resolve(true)
      })
    },
    // Submit auth form
    async onSubmit () {
      this.apiKeyErr = '' // Reset apiKey err
      this.validateApiKeyInput().then(() => {
        localStorage.setItem('client_id', this.client_id)
        this.$root.client_id = this.client_id
        this.$router.push('/')
      }).catch((err) => {
        this.apiKeyErr = err
      })
    },
    onReset () {
      this.client_id = null
      this.$root.client_id = null
      localStorage.removeItem('client_id')
    }
  }
}
</script>
