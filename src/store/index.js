import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    favorite: [],
    count: 0
  },
  mutations: {
    pushFavorite(){
      this.state.favorite.push('addPush')
    },
    increment (state) {
      state.count++
    }
  },
  actions: {
  },
  modules: {
  }
})
