<template lang="html">
    <div id="user-card" class="bg-zinc-800/50 shadow-sm rounded-xl">
        <div id="card-body" class="xl:flex text-center xl:text-left items-center py-6 px-3 xl:p-6">
          <img :src="src" :alt="alt" @click="onImgClick" class="rounded-full w-10 xl:w-16 h-10 xl:h-16 mb-2 mx-auto xl:ml-0 xl:mr-5 xl:mb-2 block"/>
          <div id="user-desc" class="inline-block">
            <h3 class="block mb-1 text-lg font-bold">{{ user.name }}</h3>
            <p class="block opacity-50 text-xs font-light">{{ user.bio }}</p>
            <slot name="default"/>
          </div><!-- end user desc -->
        </div><!-- end flex body -->
    </div><!-- end card -->
</template>

<script>
import * as UserService from '../http/UserService'

export default {
  name: 'UserCard',

  props: {
    username: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      user: {
        profile_image: {},
        bio: '',
        user_name: '',
        first_name: ''
      }
    }
  },

  computed: {
    src () {
      return this.user.profile_image.medium
    },
    alt () {
      return this.user.name
    }
  },

  created () {
    UserService.get(this.username, { client_id: this.$root.client_id })
      .then(res => {
        this.user = res.data
      })
      .catch(console.error)
  },

  methods: {
    onImgClick () {
      this.$router.push({ name: 'User', params: { username: this.username } })
    }
  }
}
</script>
