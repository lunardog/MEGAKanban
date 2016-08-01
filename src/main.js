import Firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'

import nonsense from './nonsense'
import App from './App.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  hashboang: false,
  history: true,
})

let MEGAKanban = Vue.extend({})

let Redirect = Vue.extend({

  ready() {
    let boardName = nonsense.randomSet()
      .concat(nonsense.randomNumber())
      .join('-')
    router.go(boardName)
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
