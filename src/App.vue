<template>

  <div id="app">

    <h1>メガ看板</h1>

    <section v-for="section in sections"><h2>{{section}}</h2></section>

    <memo v-for="memo in memos" :memo="memo" :ref="childRef(memo)"></memo>

    <div v-on:click="addMemo" class="bigplus">⊕</div>

  </div>

</template>

<script>
import firebase from "firebase"
import config from './config'
import memo from './sticky.vue'

firebase.initializeApp(config.firebase)

let db = new firebase.database()
let memosRef = db.ref('memos')

function natural() {
  let rnd = 0
  for (let i=0; i<5; i++) {
    rnd += Math.random()*2 - 1
  }
  return rnd / 5
}

export default {

  firebase: {
    memos: memosRef.orderByKey()
  },

  components: {
    memo
  },

  data() {
    return {
      sections: ['TODO', 'DOING', 'DONE']
    }
  },

  methods: {

    childRef(memo) {
      return memosRef.child(memo['.key'])
    },

    onClick(e) {
      console.log('doubleclick')
      console.log(e)
      memosRef.push({
        text: '',
        position: {
          left: e.clientX,
          top: e.clientY
        }
      })
    },

    addMemo(e) {
      e.preventDefault()

      memosRef.push({
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
