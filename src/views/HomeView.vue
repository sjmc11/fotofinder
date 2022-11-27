<template lang="html">
    <div id="home-view" class="container fadeInDown">
      <!-- Page heading -->
      <PageHeading :title="isFavourites ? 'Favourite photos' : 'Photos'" :subTitle="computedSubtitle">
        <template v-if="!isFavourites">
          <div id="actions" class="block xs:flex mt-2 md:mt-0">
            <input type="search" v-model="searchTerm" @change="handleFilter" placeholder="Search photos" class="md:ml-3 lg:ml-5 border border-zinc-700 bg-zinc-800/50 rounded-md w-full md:w-80 h-9 px-4 text-xs focus:outline-none fadeInDown mb-2 xs:mb-0">
            <div id="per-page" class="inline-flex items-center xs:ml-3 border border-zinc-700 bg-zinc-800/50 rounded-md text-xs h-9 relative fadeInDown">
              <span class="inline-block px-3 opacity-50 whitespace-nowrap">Per page</span>
              <select @change="handleFilter" v-model="pagination.per_page" class="px-3 appearance-none w-20 h-9 border-l border-zinc-700 focus:outline-none bg-transparent">
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span class="mr-3 absolute pointer-events-none right-1 text-lg opacity-50" style="top: -2px">⌄</span>
            </div><!-- end per page -->
          </div>
        </template>
      </PageHeading>
      <!-- Loader -->
      <Loader v-if="photoListAxios && !computedPhotoList.length"/>
      <!-- Error -->
      <div v-else-if="photoListErr" class="bg-zinc-800/50 p-5 rounded-md flex items-center fadeInDown">
        <span class="text-xl mr-6">👎️</span>
        <div class="err-info">
          <h6 class="font-bold block mb-1">Could not load photos</h6>
          <p class="opacity-50 text-xs">{{photoListErr}}</p>
        </div><!-- end err info -->
        <button type="button" class="rounded-md bg-zinc-800/50 ml-auto py-3 px-6 border border-zinc-700 hover:text-cyan-500 trans hover:border-cyan-900/50" title="Try again" @click="fetchPhotos()">Try again</button>
      </div><!-- end error msg -->
      <!-- Results -->
      <template v-else-if="computedPhotoList.length">
        <!-- Photos -->
        <PhotoList :photos="computedPhotoList" v-model="pagination"></PhotoList>
        <!-- Pagination (could/should go inside of Photo List wrapper component as a component itself and use props/emit approach for re-usability)-->
        <template v-if="pagination.total_results && !isFavourites"><!-- show if not favourites view -->
          <p class="text-xs opacity-50 text-center mt-14">Showing {{((pagination.page * pagination.per_page) - pagination.per_page + 1).toLocaleString()}} - {{((pagination.page * pagination.per_page) - pagination.per_page + computedPhotoList.length).toLocaleString()}} of {{kFormat(pagination.total_results)}} results</p>
          <div id="pagination" class="flex items-center justify-center gap-x-2 mt-3">
            <!-- back -->
            <button type="button" :class="{'pointer-events-none opacity-25' : pagination.page === 1}" @click="handlePageUpdate(pagination.page - 1)" class="bg-zinc-800/50 rounded-md border border-zinc-700 px-2 py-1">←</button>
            <!-- first -->
            <button type="button" v-if="pagination.page > 5" @click="handlePageUpdate(1)" class="bg-zinc-800/50 rounded-md border border-zinc-700 px-2 py-1 hidden md:inline-block">...</button>
            <!-- dynamic page buttons -->
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
      <p v-else class="py-4 px-6 bg-zinc-800/50 rounded-lg text-xs">No {{isFavourites ? 'favourite' : 'editorial'}} photos found.</p>
    </div>
</template>

<script>
import * as PhotoService from '../http/PhotoService'
import PageHeading from '@/components/layout/PageHeading'
import PhotoList from './PhotoList'
import Loader from '@/components/Loader'

export default {
  name: 'HomeView',

  components: {
    Loader,
    PageHeading,
    PhotoList
  },

  data () {
    return {
      searchTerm: '', // Reactive v-model data for input
      activeSearchTerm: '', // Detect the applied search value post-search request for display on page
      photoList: [], // Generic photo list for editorial feed & search results
      photoListErr: '', // Data for determining if error has occurred fetching photos
      photoListAxios: true,
      pagination: {
        page: 1,
        per_page: 20,
        order_by: 'latest',
        total_results: 0
      }
    }
  },
  watch: {
    $route: {
      handler: function () {
        this.searchTerm = ''
        this.activeSearchTerm = ''
        this.fetchPhotos()
      }
    }
  },
  created () {
    this.fetchPhotos()
  },
  methods: {
    // Handle pagination change
    handlePageUpdate (pageNum) {
      this.pagination.page = Number(pageNum)
      this.fetchPhotos()
    },
    // Handle filter change: per-page, search.
    handleFilter () {
      this.pagination.page = 1 // Reset current page
      // If no search term fetch editorial feed else do search
      // IMO this could be a single API endpoint from unsplash that when not given a search term returns the editorial feed by default
      this.fetchPhotos()
    },
    fetchPhotos () {
      if (this.isFavourites) {
        this.fetchFavPhotos()
      } else if (this.searchTerm) {
        this.fetchPhotoSearchResults()
      } else {
        this.fetchGenericPhotos()
      }
    },
    // Fetch editorial feed images
    fetchGenericPhotos () {
      this.photoListAxios = true
      this.photoListErr = ''
      PhotoService.list({
        client_id: this.$root.client_id,
        page: this.pagination.page,
        per_page: this.pagination.per_page,
        order_by: this.pagination.order_by
      })
        .then(res => {
          this.photoList = res.data
          this.activeSearchTerm = ''
          this.pagination.total_results = res.headers['x-total'] ? res.headers['x-total'] : 0
          this.photoListAxios = false
        })
        .catch((err) => {
          // this.photoListErr = err
          this.photoListAxios = false
          console.error(err)
        })
    },
    // Loop favList & fetch - Network heavy approach but most reliable
    fetchFavPhotos () {
      this.photoListAxios = true
      this.photoListErr = ''
      this.photoList = [];
      (this.$root.favList).forEach((photoId) => {
        PhotoService.get(photoId, { client_id: this.$root.client_id })
          .then(res => {
            this.photoList.push(res.data)
            this.photoListAxios = false
          })
          .catch((err) => {
            this.photoErr = err
            this.doingAxios = false
            console.error(err)
          })
      })
    },
    // Fetch photo search results
    fetchPhotoSearchResults () {
      this.photoListErr = ''
      this.photoListAxios = true
      this.activeSearchTerm = this.searchTerm
      PhotoService.search({
        client_id: this.$root.client_id,
        query: this.searchTerm,
        page: this.pagination.page,
        per_page: this.pagination.per_page,
        order_by: this.pagination.order_by
      })
        .then(res => {
          this.photoList = res.data.photos.results
          this.photoListAxios = false
        })
        .catch((err) => {
          this.photoListErr = err
          this.photoListAxios = false
          console.error(err)
        })
    }
  },
  computed: {
    isFavourites () {
      return this.$route.path === '/faves'
    },
    computedPhotoList () {
      if (this.isFavourites) {
        return this.photoList.filter((p) => {
          return this.$root.favList.includes(p.id)
        })
      } else {
        return this.photoList
      }
    },
    computedSubtitle () {
      switch (true) {
        case this.isFavourites:
          return 'Your liked images'
        case !!this.activeSearchTerm:
          return 'Search results for "' + this.activeSearchTerm + '"'
        default:
          return 'Latest editorial photos'
      }
    },
    totalPageCount () {
      return Math.ceil(this.pagination.total_results / this.pagination.per_page).toFixed()
    }
  }
}
</script>
