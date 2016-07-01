<template>
  <div id="app" v-on:dblclick="onClick">
    <memo v-for="memo in memos" :memo="memo" :ref="childRef(memo)">
    </memo>
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
      memosRef.push({text: this.text })
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
body{
  font-family: Helvetica, sans-serif;
}
</style>
