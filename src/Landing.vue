<template>
<div id="landing">
  <h1>メガ看板</h1>
  <form v-on:submit="rootBoard">
    <div class="control">
      <button class="refresh" v-on:click="refreshUrl"></button>
      <input type="text" v-model="formText" autofocus="true">
      <button class="check" type="submit"></button>
    </div>
  </form>
</div>

</template>

<script>
import nonsense from './nonsense'

export default {
  ready() {
    this.refreshUrl()
  },

  data() {
    return {
      formText: ""
    }
  },

  methods: {
    rootBoard(e) {
      e.preventDefault()
      this.$route.router.go(this.formText)
    },
    refreshUrl() {
      this.formText = nonsense.randomSet()
        .concat(nonsense.randomNumber())
        .join('-')
    }
  }
}

</script>

<style>
#landing {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  margin-left: -250px;
  margin-top: -24px;
}

form .control {
  height: 46px;
}

form .control > * {
  float: left;
  border-radius: 4px;
}

input {
  font-size: 18px;
  font-weight: 400;
  color: #ccc;
  background: transparent;
  width: 400px;
  height: 100%;
  border: 2px solid #333;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 5px;
  -moz-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

input:focus{
  box-shadow: 0 0 5px #888;
}

button {
  display: inline-block;
  cursor: pointer;
  border: 4px solid transparent;
  background-repeat: no-repeat;
  background-position: center center;
  margin-top: 2px;
  width: 42px;
  height: 42px;
}

button:focus {
  outline: none;
}

.check {
  background-color: #FC7A2B;
  background-image: url(./img/check.svg);
}

.refresh {
  background-color: transparent;
  background-image: url(./img/refresh.svg);
}

</style>
