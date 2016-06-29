<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div v-for="memo in memos">
      <h2>{{ memo.date }}</h2>
      <p>{{ memo.text }}</p>
      <a href="#" v-on:click="deleteMemo(memo)">delete</a>
      <hr>
    </div>
    <div>
      <form v-on:submit="addMemo">
        <input type="date" v-model="date"><br>
        <textarea name="text" v-model="text"></textarea><br>
        <button type="submit">save</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import config from './config'

firebase.initializeApp(config.firebase)

let db = new firebase.database()
let memosRef = db.ref('memos')

export default {
  firebase: {
    memos: memosRef.limitToLast(25)
  },
  created() {
  },
  data () {
    return {
      date: "2016-06-11",
      text: "new memo"
    }
  },
  methods: {
    deleteMemo(memo) {
      memosRef.child(memo['.key']).remove()
    },
    addMemo(e) {
      e.preventDefault()
      memosRef.push({
        date: this.date,
        text: this.text
      })
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
