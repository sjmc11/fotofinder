<template>
  <div class="bg-zinc-800/50 shadow-sm p-4 rounded-xl overflow-scroll">
    <h5 class="block mb-3 font-bold">Photo information</h5>
    <table class="meta-table">
      <tbody>
      <tr>
        <td>Width</td>
        <td>{{(photo.width).toLocaleString('en', {maximumFractionDigits: 0})}} px</td>
      </tr>
      <tr>
        <td>Height</td>
        <td>{{(photo.height).toLocaleString('en', {maximumFractionDigits: 0})}} px</td>
      </tr>
      <tr>
        <td>Color</td>
        <td>
          <div class="flex items-center">
            <span class="w-4 h-4 rounded-sm inline-block mr-2" :style="{background: photo.color}"></span>
            <span class="font-bold text-xs opacity-50">{{photo.color}}</span>
          </div><!-- end cell flex wrapper as showing multiple elements in cell -->
        </td>
      </tr>
      </tbody>
      <tbody class="divider-tbody">
      <tr><td colspan="2" class="pt-4"/></tr>
      <tr><td colspan="2" class="border-t border-zinc-700 pt-4"/></tr>
      </tbody><!-- end tbody divider -->
      <tbody>
      <tr>
        <td>Views</td>
        <td>{{kFormat(photo.views)}}</td>
      </tr>
      <tr>
        <td>Likes</td>
        <td>{{kFormat(photo.likes)}}</td>
      </tr>
      <tr>
        <td>Downloads</td>
        <td>{{kFormat(photo.downloads)}}</td>
      </tr>
      <tr>
        <td>Sponsored</td>
        <td>{{photo.sponsorship ? 'Yes' : 'No'}}</td>
      </tr>
      </tbody>
    </table>
  </div><!-- end photo meta information card -->
</template>

<script>
export default {
  name: 'PhotoMetaCard',
  props: {
    photo: {
      type: Object,
      required: true,
      default () {
        return {
          created_at: '',
          urls: {},
          user: {}
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.meta-table{
  width: 100%;
  tr{
    td{
      padding: 4px 0;
    }
  }
}
</style>
