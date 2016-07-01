<template>
  <div id="app">
    <h1>メガ看板</h1>
    <memo v-for="memo in memos" :memo="memo" :ref="childRef(memo)">
    </memo>
    <div v-on:click="addMemo" class="bigplus">⊕</div>
  </div>
</template>

<script>
import firebase from "firebase"
import config from './config'
import memo from './memo.vue'

firebase.initializeApp(config.firebase)

let db = new firebase.database()
let memosRef = db.ref('memos')

export default {

  firebase: {
    memos: memosRef.orderByKey()
  },

  components: {
    memo
  },

  data () {
    return {
      text: "new memo"
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
          left: 100 + 50 * Math.random(),
          top: 100 + 50 * Math.random()
        },
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
  background: #ccc;
}
.bigplus {
  font-size: 100px;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 60px;
  opacity: 0.1;
  transition: opacity 0.5s;
  cursor: pointer;
}
h1 {
  opacity: 0.1;
  color: black;
  position: absolute;
  left: 10px;
  top: 0px;
  font-size: 60px;
  line-height: 20px;
}
.bigplus:hover {
  opacity: 0.5;
}
body{
  font-family: Helvetica, sans-serif;
}
</style>
