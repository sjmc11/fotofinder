<template>
    <div id="page-heading" class="md:flex mb-6 xl:mb-9 items-center">
        <div class="page-heading-primary mr-auto">
          <h1 class="text-xl sm:text-2xl lg:text-3xl">{{title}}</h1>
          <p class="font-light opacity-50 sm:text-lg sm:mt-1" v-if="subTitle">{{subTitle}}</p>
        </div><!-- end primary content -->
        <slot name="default"/><!-- area to include action triggers: search bar, buttons, etc.. -->
    </div><!-- end page heading -->
</template>

<script>
export default {
  name: 'PageHeading',
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
