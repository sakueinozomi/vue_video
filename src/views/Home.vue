<template>
  <div class="home">
    <VideoIndex />
  </div>
</template>

<script>
// @ is an alias to /src
import VideoIndex from '@/components/VideoIndex.vue'

export default {
  name: 'Home',
  components: {
    VideoIndex
  }
}
</script>
