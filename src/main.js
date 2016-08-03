import Firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Landing from './Landing.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  hashboang: false,
  history: true,
})

let MEGAKanban = Vue.extend({})

router.map({
  '/': {
    name: 'root',
    component: Landing
  },
  '/:board': {
    name: 'board',
    component: App
  }
})

router.start(MEGAKanban, '#main')
