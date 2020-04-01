<template>
  <div class="container">
    <div class="video_container">
      <div class="video_box" v-for="(item, index) in videoItems[page_num]" :key="index">
        <div class="video_box_img" v-bind:style="{ backgroundImage: 'url(' + item.snippet.thumbnails.standard.url + ')' }">
          <div class="video_duration" v-text="transferTimeFormat(item.contentDetails.duration)"></div>
        </div>
        <div class="video_title" v-text="item.snippet.title"></div>
        <div class="video_description" v-text="item.snippet.description"></div>
      </div>
    </div>
    <div class="btn" v-on:click="clickTest('')">
      click to add store
    </div>
    <paginate
      :page-count="total_page"
      :click-handler="clickPagination"
      :initial-page ="'1'"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :first-last-button="true"
      :first-button-text="'<<'"
      :last-button-text="'>>'">
    </paginate>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)
Vue.use(VueAxios, axios)

export default {
  name: 'VideoIndex',
  data() {
    return {
      msg: 'index',
      videoItems: [],
      catchFavorite: this.$store.state.favorite,
      page_num: 0
    }
  },
  created() {
    Vue.axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=50&key=AIzaSyBOdz5KQWjpP44XNJirEpIgYlKkkGisE98').then((response) => {
      let video_array_1 = response.data.items; 
      Vue.axios.get('https://www.googleapis.com/youtube/v3/videos?pageToken=CAwQAA&part=snippet,contentDetails&chart=mostPopular&maxResults=50&key=AIzaSyBOdz5KQWjpP44XNJirEpIgYlKkkGisE98').then((response) => {
        let video_array_2 = response.data.items;
        let video_array_all = video_array_1.concat(video_array_2);
        this.videoItems = this.chunkArray(video_array_all, 12);
        this.total_page = Math.ceil(video_array_all.length/12);
      })     
    })
    // this.$store.commit('pushFavorite');
    // console.log(this.$store.state.favorite)
    // console.log(this.catchFavorite)
  },
  computed: {

  },
  methods: {
    clickTest: function(e) {
      this.$store.commit('pushFavorite');
      console.log(this.$store.state.favorite)
      console.log(e)
    },
    transferTimeFormat: function(str) {
      return str.replace(/PT|S/g, '').replace(/[A-Z]/g, ':');
    },
    clickPagination: function(p){
      this.page_num = p-1;
    },
    chunkArray: function(arr, size){
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/style.scss" lang="scss"></style>
