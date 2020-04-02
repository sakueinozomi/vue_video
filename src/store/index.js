import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    favorite: [],
  },
  mutations: {
    pushFavorite(){
      this.state.favorite.push('addPush')
    }
  },
  actions: {
  },
  modules: {
  }
})
