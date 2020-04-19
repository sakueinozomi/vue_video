<template>
  <div class="player">
    <h1>{{ msg }}</h1>
    <div>
      <video id="my-video" class="video-js vjs-default-skin" controls preload="auto">
        <source src="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8" type="application/x-mpegURL">
      </video>
    </div>
  </div>
  
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'

export default {
  name: 'Player',
  data() {
    return {
      msg: 'player_page'
    }
  },
  mounted() {
    videojs('my-video', {
      bigPlayButton: true,
      textTrackDisplay: false,
      posterImage: true,
      errorDisplay: false,
      controlBar: true
    })
  }
}
</script>
