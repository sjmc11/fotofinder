<template lang="html">
    <div id="user-single" class="container">
      <UserCard :username="$route.params.username" class="mb-4"></UserCard>
      <!-- Loader -->
      <Loader v-if="photoAxios"/>
      <!-- Error -->
      <div v-else-if="photosErr" class="bg-zinc-800/50 p-5 rounded-md flex items-center">
        <span class="text-xl mr-6">👎️</span>
        <div class="err-info">
          <h6 class="font-bold block mb-1">Could not load photos by {{$route.params.username}}</h6>
          <p class="opacity-50 text-xs">{{photosErr}}</p>
        </div><!-- end err info -->
        <button type="button" class="rounded-md bg-zinc-800/50 ml-auto py-3 px-6 border border-zinc-700 hover:text-cyan-500 trans hover:border-cyan-900/50" title="Back" @click="$router.back()">← Back</button>
      </div><!-- end error msg -->
      <!-- Results -->
      <template v-else-if="photos.length">
        <!-- Photos -->
        <PhotoList :photos="photos"></PhotoList>
        <!-- Pagination (could/should go inside of Photo List wrapper component as a component itself and use props/emit approach for re-usability)-->
        <template v-if="pagination.total_results"><!-- show if not favourites view -->
          <p class="text-xs opacity-50 text-center mt-14">Showing {{((pagination.page * pagination.per_page) - pagination.per_page + 1).toLocaleString()}} - {{((pagination.page * pagination.per_page) - pagination.per_page + photos.length).toLocaleString()}} of {{kFormat(pagination.total_results)}} results</p>
          <p class="block">{{pagination.page}}</p>
          <div id="pagination" class="flex items-center justify-center gap-x-2 mt-3">
            <!-- back -->
            <button type="button" :class="{'pointer-events-none opacity-25' : pagination.page === 1}" @click="handlePageUpdate(pagination.page - 1)" class="bg-zinc-800/50 rounded-md border border-zinc-700 px-2 py-1">←</button>
            <!-- first -->
            <button type="button" v-if="pagination.page > 5" @click="handlePageUpdate(1)" class="bg-zinc-800/50 rounded-md border border-zinc-700 px-2 py-1 hidden md:inline-block">...</button>
            <!-- dynamic range -->
            <template v-for="p in Number(totalPageCount)">
              <button type="button" v-if="p > (pagination.page - 5) && p < (pagination.page + 5)" @click="handlePageUpdate(p)" :key="'pagBtn'+p" :class="{'text-cyan-500 border-cyan-700 bg-cyan-900/10' : Number(p) === pagination.page}" class="bg-zinc-800/50 rounded-md border border-zinc-700 px-2 py-1 hidden md:inline-block">{{p.toLocaleString()}}</button>
            </template>
            <!-- last -->
            <button type="button" v-if="pagination.page < (totalPageCount - 5)" @click="handlePageUpdate(totalPageCount)" class="bg-zinc-800/50 rounded-md border border-zinc-700 px-2 py-1 hidden md:inline-block">...</button>
            <!-- next -->
            <button type="button" :class="{'pointer-events-none opacity-25' : pagination.page === Number(totalPageCount)}" @click="handlePageUpdate(pagination.page + 1)" class="bg-zinc-800/50 rounded-md border border-zinc-700 px-2 py-1">→</button>
          </div><!-- end pagination -->
        </template>
      </template>
      <!-- No results -->
      <p v-else class="py-4 px-6 bg-zinc-800/50 rounded-lg text-xs">No user photos found.</p>
    </div><!-- end user single -->
</template>

<script>
import PhotoList from './PhotoList'
import UserCard from '../components/UserCard'
import * as UserService from '../http/UserService'
import Loader from '@/components/Loader'

export default {
  name: 'UserView',

  components: {
    Loader,
    PhotoList,
    UserCard
  },

  data () {
    return {
      photoAxios: true,
      photos: [],
      photosErr: '',
      pagination: {
        page: 1,
        per_page: 20,
        order_by: 'latest',
        total_results: 0
      }
    }
  },

  created () {
    this.fetchUserPhotos() // Method based pattern
  },
  methods: {
    // Fetch user photos
    fetchUserPhotos () {
      this.photoAxios = true
      UserService.listPhotos(this.$route.params.username, {
        client_id: this.$root.client_id,
        page: this.pagination.page,
        per_page: this.pagination.per_page,
        order_by: this.pagination.order_by
      })
        .then(res => {
          this.photos = res.data
          this.pagination.total_results = res.headers['x-total'] ? res.headers['x-total'] : 0
          this.photoAxios = false
        })
        .catch((err) => {
          this.photosErr = err
          this.photoAxios = false
          console.error(err)
        })
    },
    // Handle pagination change
    handlePageUpdate (pageNum) {
      this.pagination.page = Number(pageNum)
      this.fetchUserPhotos()
    }
  },
  // Computed fns required for pagination - as mentioned would make a component itself IRL with fancy v-model & emit bindings
  computed: {
    totalPageCount () {
      return Math.ceil(this.pagination.total_results / this.pagination.per_page).toFixed()
    }
  }
}
</script>
