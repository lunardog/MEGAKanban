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
import Memo from './Memo.vue'
let memosRef = new Firebase('https://dashboard-9257e.firebaseio.com/memos/')

export default {
  components: {
    memo: Memo
  },
  firebase: {
    memos: memosRef.limitToLast(25)
  },
  data () {
    return {
      date: "2016-06-11",
      text: "new memo",
      msg: 'Hello Vue!'
    }
  },
  methods: {
    deleteMemo(memo) {
      console.log(memo['.key'])
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
