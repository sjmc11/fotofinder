<template lang="html">
    <div id="photo-view" class="container fadeInDown">
      <!-- Loading -->
      <template v-if="doingAxios">
        <div class="loader text-center">
          <span class="block mb-1">⏳</span>
          <span class="block text-xs opacity-50">Loading</span>
        </div><!-- end loader -->
      </template>
      <!-- Error -->
      <div v-else-if="photoErr" class="bg-zinc-800/50 p-5 rounded-md flex items-center fadeInDown">
        <span class="text-xl mr-6">👎️</span>
        <div class="err-info">
          <h6 class="font-bold block mb-1">Could not load photo ID: {{$route.params.id}}</h6>
          <p class="opacity-50 text-xs">{{photoErr}}</p>
        </div><!-- end err info -->
        <button type="button" class="rounded-md bg-zinc-800/50 ml-auto py-3 px-6 border border-zinc-700 hover:text-cyan-500 trans hover:border-cyan-900/50" title="Back" @click="handleBack()">← Back</button>
      </div><!-- end error msg -->
      <!-- Result -->
      <template v-else>
        <PageHeading
          class="fadeInDown"
          :title="'Photo by ' + (photo.user.username ? photo.user.username : 'unknown user')"
          :subTitle="computedSubtitle">
          <div id="actions" class="mt-2 md:mt-0">
            <!-- Use v-if/else for fav buttons as doing an inline dynamic class will be a bit un-readable -->
            <button type="button" class="rounded-md bg-zinc-800/50 md:ml-4 py-3 px-6 border border-zinc-700 hover:text-cyan-500 trans hover:border-cyan-900/50" title="Back to photos" @click="handleBack()">←</button>
            <button type="button" v-if="isFav($route.params.id)" class="rounded-md bg-red-900/10 hover:bg-zinc-800/50 ml-4 py-3 px-6 border border-red-700/25 text-red-500 trans hover:text-white hover:border-zinc-700" @click="handleToggleFavourite(photo)">Unfavourite ♥</button>
            <button type="button" v-else class="rounded-md bg-zinc-800/50 ml-4 py-3 px-6 border border-zinc-700 hover:text-red-500 trans hover:border-red-900/50" @click="handleToggleFavourite(photo)">Favourite ♥</button>
          </div><!-- end action buttons -->
        </PageHeading>
        <div class="sm:grid grid-cols-12 gap-x-4 xl:gap-x-12 fadeInDown">
          <article class="col-span-8 xl:col-span-9 flex justify-center mb-4">
            <picture class="primary-image-preview">
              <img :src="photo.urls['regular']" :alt="photo.description" class="shadow-xl group-hover:brightness-50 group-hover:opacity-25 group-hover:shadow-2xl z-0 group-hover:saturate-10 trans w-full rounded-md">
            </picture>
          </article>
          <aside class="col-span-4 xl:col-span-3 order-last order-first">
            <UserCard class="mb-4" v-if="photo.user.username" :username="photo.user.username">
              <router-link :to="'/user/'+photo.user.username" class="inline-block text-xs mt-3 opacity-50 hover:opacity-100 hover:text-cyan-500">View all photos by {{photo.user.first_name}} →</router-link>
            </UserCard>
            <div class="bg-zinc-800/50 shadow-sm p-4 rounded-xl overflow-scroll mb-4">
              <h5 class="block mb-3 font-bold">Photo description</h5>
              <p class="text-xs" :class="{'opacity-50' : !photo.description}">{{photo.description ? photo.description : 'No description'}}</p>
            </div><!-- end dedicated desc car -->
            <PhotoMetaCard :photo="photo"/>
          </aside>
        </div><!-- end grid -->
      </template>
    </div><!-- end photo single -->
</template>

<script>
import UserCard from '../components/UserCard'
import * as PhotoService from '../http/PhotoService'
import PageHeading from '@/components/layout/PageHeading'
import PhotoMetaCard from '@/components/PhotoMetaCard'

export default {
  name: 'PhotoSingle',
  components: {
    PhotoMetaCard,
    PageHeading,
    UserCard
  },

  data () {
    return {
      doingAxios: true,
      photo: {
        created_at: '',
        urls: {},
        user: {}
      },
      photoErr: ''
    }
  },

  created () {
    this.handleFetchPhotoData()
  },
  methods: {
    handleFetchPhotoData () {
      this.doingAxios = true
      this.photoErr = ''
      PhotoService.get(this.$route.params.id, { client_id: this.$root.client_id })
        .then(res => {
          this.photo = res.data
          this.doingAxios = false
        })
        .catch((err) => {
          this.photoErr = err
          this.doingAxios = false
          console.error(err)
        })
    },
    handleBack () {
      this.$router.back()
    }
  },
  computed: {
    computedSubtitle () {
      return 'Added ' + this.$root.moment(this.photo.created_at).fromNow()
    }
  }
}
</script>

<style lang="scss" scoped>
  picture.primary-image-preview{
    img{
      display: block;
      width: auto;
      height: auto;
      max-height: calc(100vh - 340px);
      max-width: 100%;
    }
  }
</style>
