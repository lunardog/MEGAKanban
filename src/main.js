import Firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  hashboang: false,
  history: true,
})

let MEGAKanban = Vue.extend({})

let Redirect = Vue.extend({

  ready() {
    let boardName = localStorage.getItem('MEGAKanban_board')
    if (!boardName) {
      boardName = this.randomName()
      localStorage.setItem('MEGAKanban_board', boardName)
    }
    router.go(boardName)
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
