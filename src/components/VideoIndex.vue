<template>
  <div class="container">
    <div class="video_container">
      <div class="video_box" v-for="(item, index) in videoItem" :key="index">
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
      :container-class="'pagination'">
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
      videoItem: [],
      catchFavorite: this.$store.state.favorite,
      total_page: 0
    }
  },
  created() {
    Vue.axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=12&key=AIzaSyBOdz5KQWjpP44XNJirEpIgYlKkkGisE98').then((response) => {
      let video_array_1 = response.data.items; 
      Vue.axios.get('https://www.googleapis.com/youtube/v3/videos?pageToken=CAwQAA&part=snippet,contentDetails&chart=mostPopular&maxResults=13&key=AIzaSyBOdz5KQWjpP44XNJirEpIgYlKkkGisE98').then((response) => {
        let video_array_2 = response.data.items;
        let video_array_all = video_array_1.concat(video_array_2);
        this.videoItem = video_array_all;
        this.total_page = Math.ceil(video_array_all.length/12);
      })     
    })
    // this.$store.commit('pushFavorite');
    // console.log(this.$store.state.favorite)
    // console.log(this.catchFavorite)
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
      console.log(p)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
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
  outline: unset;
}
.video_container {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .video_box {
    width: 25%;
    padding-top: 2.5%;
    word-wrap: break-word;
    position: relative;
    text-align: left;
    .video_box_img {
      width: 90%;
      padding-bottom: 67.5%;
      margin: 0 auto;
      background-size: cover;
      position: relative;
      .video_duration {
        width: fit-content;
        padding: 0.25em 0.5em;
        background-color: rgba(0, 0, 0, .6);
        color: #cccccc;
        font-size: 12px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .video_title {
      color: #000000;
      font-weight: 700;
      padding: 0.5em 5% 0;
      line-height: 1.2em;
    }
    .video_description {
      font-size: 12px;
      padding: 0 5%;
      color: #cccccc;
      max-height: 80px;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &:-webkit-scrollbar-track {
        background: transparent; 
      }
      &::-webkit-scrollbar-thumb {
        background: #555555; 
        border-radius: 5px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #cccccc; 
      }
    }

  }
}
.pagination {
  .active, .disabled {
    a {
      color: #000000;
    }
  }
}
.btn {
  cursor: pointer;
  border: solid 1px #cccccc;
  width: fit-content;
  padding: 5px;
  margin: 0 auto;
}

</style>
