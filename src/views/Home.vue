<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
