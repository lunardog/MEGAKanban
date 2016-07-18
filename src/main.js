import Firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)

let router = new VueRouter()

router.map({
  '/': {
    name: 'root', // give the route a name
    component: App
  },
})

router.start(App, '#app')
