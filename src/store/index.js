import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import messages from '@/store/messages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, messages
  }
})