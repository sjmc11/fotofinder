import moment from 'moment'

const customFuncs = {
  data: function () {
    return {
      get moment () {
        return moment
      }
    }
  },
  methods: {
    /**
     * Main method for toggling photo favourite status
     * Implemented as a global mixin for re-usability and scope of Vue context for reactivity.
     * @param photoId
     */
    handleToggleFavourite (photoId) {
      // Re-using the approach from authSubmit in which localstorage & vue data is kept in sync
      // Determine if photo already favourited - don't use .includes() as need the index anyway for un-favouriting
      const existsIndex = this.$root.favList.indexOf(photoId)
      if (existsIndex >= 0) {
        // remove
        this.$root.favList.splice(existsIndex, 1)
      } else {
        // add
        this.$root.favList.push(photoId)
      }
      // Overwrite the localstorage record - no need to re-compute anything
      localStorage.setItem('fav_list', (this.$root.favList).join(','))
    },
    isFav (photoId) {
      return this.$root.favList.includes(photoId)
    },
    /**
     * Formatter for large numbers - ui touch
     * @param num
     * @return {string}
     */
    kFormat (num) {
      if (num > 999 && num < 1000000) {
        return Number(num / 1000).toLocaleString('en', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1
        }) + 'K' // convert to K for number from > 1000 < 1 million
      } else if (num > 1000000) {
        return Number(num / 1000000).toLocaleString('en', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1
        }) + 'M' // convert to M for number from > 1 million
      } else {
        return Number(num).toLocaleString('en', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }) // if value < 1000, nothing to do
      }
    }
  }
}

export default customFuncs
