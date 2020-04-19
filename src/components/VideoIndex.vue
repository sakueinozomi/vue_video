<template>
  <div class="container">
    <div class="video_container">
      <div class="video_box" v-for="(item, index) in videoItemArray[page_num]" :key="index">
        <div class="video_box_img" :style="{ backgroundImage: 'url(' + item.snippet.thumbnails.high.url + ')' }">
          <div class="video_duration" v-text="transferTimeFormat(item.contentDetails.duration)"></div>
          <div class="video_favorite" @click="toggleFavorite(item.id)">
            <div class="favorite_icon" v-if="item.favorite">★</div>
            <div v-else>☆</div>
          </div>
        </div>
        <div class="video_title" v-text="item.snippet.title"></div>
        <div class="video_description" v-text="item.snippet.description"></div>
      </div>
    </div>
    <div class="btn" @click="clickTest('')">
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
      videoItemArray: [],
      videoFavorite:[],
      page_num: 0,
      total_page: 0,
      per_page_pagination: 12,
      test: false
    }
  },
  created() {
    if (this.$store.state.allVideoItems == 0) {
      Vue.axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=12&key=AIzaSyBOdz5KQWjpP44XNJirEpIgYlKkkGisE98').then((response) => {
        let video_array_1 = response.data.items; 
        Vue.axios.get('https://www.googleapis.com/youtube/v3/videos?pageToken=CAwQAA&part=snippet,contentDetails&chart=mostPopular&maxResults=13&key=AIzaSyBOdz5KQWjpP44XNJirEpIgYlKkkGisE98').then((response) => {
          let video_array_2 = response.data.items;
          let video_array_all = video_array_1.concat(video_array_2);
          this.videoItemArray = this.chunkArray(video_array_all, this.per_page_pagination);
          this.$store.commit('getAllVideoItems', this.videoItemArray)
          this.total_page = Math.ceil(video_array_all.length/this.per_page_pagination);
        })     
      })
    } else {
      this.videoItemArray = this.$store.state.allVideoItems;
    }
    
  },
  beforeDestroy() { 
    this.$store.commit('getAllVideoItems', this.videoItemArray)
  },
  methods: {
    transferTimeFormat: function(str) {
      return str.replace(/PT|S/g, '').replace(/[A-Z]/g, ':');
    },
    clickPagination: function(p){
      this.page_num = p-1;
    },
    chunkArray: function(arr, size){
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
    },
    toggleFavorite: function(id){
      let self = this // to solve use this can't call other method function
      this.videoItemArray[this.page_num].forEach(
        function(item) {
          if(item.id == id) {
            if(item.favorite) {
              Vue.set(item, 'favorite', false);
            } else {
              Vue.set(item, 'favorite', true);
            }
            self.checkItemInArray(item.id, self.videoFavorite);
            console.log(self.videoFavorite)
          } 
        }
      )
    },
    checkItemInArray: function(item, arr){
      if(arr.indexOf(item) > -1) {
        arr.splice(arr.indexOf(item), 1)
      } else {
        arr.push(item)
      }
    },
    checkArrayItemInObject: function(arr, obj){
      console.log(arr, obj)
    }
  }
}
</script>

<style src="../assets/style.scss" lang="scss"></style>
