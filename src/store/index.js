import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    allVideoItemsWithPagination:[],
    VideoItems:[],
    favoriteItems:[]
  },
  mutations: {
    getAllVideoItemsPagination(state, item){
      state.allVideoItemsWithPagination = item;
    },
    getVideoItems(state, item){
      state.VideoItems = item;
    },
    getfavoriteItems(state, item) {
      state.favoriteItems = state.VideoItems.filter((el)=>{return item.includes(el.id)})
      // console.log(state.favoriteItems)
    }
  },
  actions: {
    
  },
  modules: {
  }
})
