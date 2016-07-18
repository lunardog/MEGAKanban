<template>
  <div id="app" v-show="authenticated">
    <h1>メガ看板</h1>
    <section v-for="section in sections"><h2>{{section}}</h2></section>
    <board :ref="stickiesRef"></board>
    <div v-on:click="addSticky" class="bigplus">⊕</div>
  </div>
</template>

<script>
import firebase from 'firebase'
import config from '../config/config'

import board from './components/Board.vue'

firebase.initializeApp(config.firebase)

let db = new firebase.database()

export default {

  components: { board },

  data() {
    let board = encodeURIComponent(this.$route.params.board)
    return {
      authenticated: false,
      sections: ['TODO', 'DOING', 'DONE'],
      stickiesRef: db.ref('boards/' + board + '/stickies')
    }
  },

  ready() {
    firebase.auth().signInAnonymously().then(() => {
      this.authenticated = true
    })
  },

  methods: {

    // triggered by the big (+) button in the top left corner
    addSticky(e) {
      e.preventDefault()

      // add a sticky with default values
      this.stickiesRef.push({
        text: '',
        position: {
          left: 0.15 * Math.random(),
          top: 0.9 * Math.random()
        },
        rotate: 10 * Math.random() - 5,
        color: '#eee'
      })
    }

  }
}
</script>

<style>
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #444;
}

.bigplus {
  color: #eee;
  font-size: 100px;
  position: absolute;
  left: 15px;
  top: 15px;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 60px;
  opacity: 0.5;
  transition: opacity 0.5s;
  cursor: pointer;
}

.bigplus:hover {
  opacity: 1.0;
}

h1 {
  opacity: 0.5;
  color: #ccc;
  position: absolute;
  left: 10px;
  bottom: 0px;
  font-size: 60px;
  line-height: 20px;
}

h2 {
  color: #ccc;
}

section {
  width: 32%;
  height: 100%;
  float: left;
  text-align: center;
  border-right: 3px dotted #ccc;
  opacity: 0.5;
}

body {
  font-family: Helvetica, sans-serif;
}
</style>
