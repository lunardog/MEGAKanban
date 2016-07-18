import Firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)

let router = new VueRouter()

let MEGAKanban = Vue.extend({})

let Redirect = Vue.extend({
  created() {
    // create a random board name and redirect to it
    router.go(this.randomName())
  },
  methods: {
    // generate board name using timestamp
    // @todo: generate memorable names
    randomName() {
      let now = new Date()
      return btoa(now)
    }
  }
})

router.map({
  '/': {
    name: 'root', 
    component: Redirect
  },
  '/:board': {
    name: 'board', 
    component: App
  }
})

router.start(MEGAKanban, '#main')
