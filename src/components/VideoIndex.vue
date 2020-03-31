<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="video_box">

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'VideoIndex',
  data() {
    return {
      msg: 'index',
      videoItem: []
    }
  },
  created() {
    Vue.axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=12&key=AIzaSyBOdz5KQWjpP44XNJirEpIgYlKkkGisE98').then((response) => {
      let video_array_1 = response.data.items; 
      Vue.axios.get('https://www.googleapis.com/youtube/v3/videos?pageToken=CAwQAA&part=snippet,contentDetails&chart=mostPopular&maxResults=12&key=AIzaSyBOdz5KQWjpP44XNJirEpIgYlKkkGisE98').then((response) => {
        let video_array_2 = response.data.items;
        let video_array_all = video_array_1.concat(video_array_2);
        this.videoItem = video_array_all;
      })     
    })
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
