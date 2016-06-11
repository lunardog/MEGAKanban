import Vue from 'vue'
import Memo from './Memo.vue'
import App from './App.vue'

import VueFire from 'vuefire'
import Firebase from 'firebase'
import config from './config'

Vue.use(VueFire)

new Vue({
  el: 'body',
  ready() {
    firebase.initializeApp(config.firebase)
  },
  components: { App }
})
