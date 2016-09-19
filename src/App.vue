<template>
<div id="app">
  <section v-for="section in sections">
    <h2>{{section}}</h2>
  </section>
  <h1>メガ看板</h1>
  <board :ref="stickiesRef"></board>
  <div v-on:click="addSticky" class="bigplus">⊕</div>
</div>

</template>

<script>
import firebase from 'firebase'
import config from '../config/config'

import Board from './components/Board.vue'

firebase.initializeApp(config.firebase)

let db = new firebase.database()

export default {

  components: {
    Board
  },

  data() {
    let board = encodeURIComponent(this.$route.params.board)
    return {
      sections: ['TODO', 'DOING', 'DONE'],
      stickiesRef: db.ref('boards').child(board).child('stickies')
    }
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
  background: #333;
  background: -webkit-linear-gradient(#444, #000);
  /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(#444, #000);
  /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(#444, #000);
  /* For Firefox 3.6 to 15 */
  background: linear-gradient(#444, #000);
  /* Standard syntax */
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
  opacity: 0.2;
  transition: opacity 0.5s;
  text-shadow: 0 0 5px black;
  cursor: pointer;
}

.bigplus:hover {
  opacity: 1.0;
}

h1 {
  opacity: 0.3;
  color: #666;
  position: absolute;
  text-align: center;
  width: 100%;
  top: 0px;
  font-size: 60px;
  line-height: 20px;
}

h2 {
  color: #ccc;
  text-shadow: 0 0 5px black;
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 10px;
}

section {
  width: 33%;
  border-collapse: collapse;
  height: 100%;
  position: relative;
  float: left;
  text-align: center;
  border-left: 3px dotted #666;
  opacity: 0.3;
}

section:first-child {
  border-left: none;
}

html {
  height: 100%;
}

body {
  font-family: Helvetica, sans-serif;
  height: 100%;
  background: #333;
  background: -webkit-linear-gradient(#444, #000);
  /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(#444, #000);
  /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(#444, #000);
  /* For Firefox 3.6 to 15 */
  background: linear-gradient(#444, #000);
  /* Standard syntax */
}

</style>
