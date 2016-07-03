<template>

  <div id="app">

    <h1>メガ看板</h1>

    <section v-for="section in sections"><h2>{{section}}</h2></section>

    <sticky v-for="sticky in stickies" :sticky="sticky" :ref="childRef(sticky)"></sticky>

    <div v-on:click="addSticky" class="bigplus">⊕</div>

  </div>

</template>

<script>
import firebase from "firebase"
import config from './config'
import sticky from './Sticky.vue'
import {natural} from './util'

firebase.initializeApp(config.firebase)

let db = new firebase.database()
let stickiesRef = db.ref('stickies')

export default {

  firebase: {
    stickies: stickiesRef.orderByKey()
  },

  components: {
    sticky
  },

  data() {
    return {
      sections: ['TODO', 'DOING', 'DONE']
    }
  },

  methods: {

    childRef(sticky) {
      return stickiesRef.child(sticky['.key'])
    },

    onClick(e) {
      console.log('doubleclick')
      console.log(e)
      stickiesRef.push({
        text: '',
        position: {
          left: e.clientX,
          top: e.clientY
        }
      })
    },

    addSticky(e) {
      e.preventDefault()

      stickiesRef.push({
        text: '',
        position: {
          left: 0.15 * Math.random(),
          top: 0.9 * Math.random()
        },
        rotate: 10 * natural(),
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
  background: #808284;
}
.bigplus {
  font-size: 100px;
  position: absolute;
  left: 15px;
  top: 15px;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 60px;
  opacity: 0.1;
  transition: opacity 0.5s;
  cursor: pointer;
}

.bigplus:hover {
  opacity: 0.5;
}


h1 {
  opacity: 0.1;
  color: black;
  position: absolute;
  left: 10px;
  bottom: 0px;
  font-size: 60px;
  line-height: 20px;
}

section {
  width: 33%;
  height: 100%;
  float: left;
  text-align: center;
  border-right: 3px dotted black;
  opacity: 0.1;
}

body{
  font-family: Helvetica, sans-serif;
}
</style>
