import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    designId: storage.get('designId') || 1,
  },
  mutations: {
    setDesignId(state, val){
      storage.set('designId', val);
      state.designId = val;
    }
  },
  actions: {
  },
  modules: {
  }
})
