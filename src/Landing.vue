<template>
  <div id="landing">
    <div class="title">
      メガ看板
      <div class="underline"></div>
    </div>
    <div id="form">
      <div class="url">megakanban.firebaseapp.com/</div>
      <div class="control">
        <input type="text"
          v-model="formText">
        <button class="refresh"
          v-on:click="refreshUrl"></button>
        <button class="check"
          v-on:click="rootBoard"></button>
      </div>
    </div>
  </div>
</template>

<script>
import nonsense from './nonsense'

export default {
  ready(){
    this.refreshUrl()
  },

  data() {
    return {
      formText:""
    }
  },

  methods: {
    rootBoard() {
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
  background-image: linear-gradient(to bottom, #242424, #7b7b7b);
}
.title {
  margin:10% auto 0px;
  font-family: HiraginoSans-W6;
  font-size: 36px;
  font-weight: 400;
  color: #7e7e7e;
  text-align:center;
}
.underline {
  margin:8px auto;
  width: 500px;
  height: 1px;
  border: solid 1px #777777;
}
#form {
  position:relative;
  margin:110px auto;
  width: 395px;
}
#form .url {
  width: 96px;
  height: 14px;
  font-family: HiraginoSans-W3;
  font-size: 14px;
  font-weight: 400;
  color: #959aa1;
}
#form .control {
  position:relative;
  margin-top:7px;
  width: 395px;
  height: 46px;
}
input {
  font-family: HiraginoSans-W6;
  font-size: 12px;
  font-weight: 400;
  color: #7e7e7e;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border:solid 2px grey;
  padding-right: 80px;
  padding-left: 20px;
  -moz-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
button {
  cursor: pointer;
  border:1px solid transparent;
  border-radius: 2px;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
}
button:focus{
  outline:none;
}
.check {
  width: 42px;
  height: 42px;
  top: 2px;
  right: 2px;
  background-color: #82b9de;
  background-image: url(./img/check.svg);
}
.refresh {
  width: 42px;
  height: 42px;
  top: 2px;
  right: 42px;
  background-color: transparent;
  background-image: url(./img/refresh.svg);
}
</style>
