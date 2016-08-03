<template>
  <div id="landing">
  <div id="title">メガ看板</div>
  <div id="underline"></div>
  <div id="form">
    <div class="url">megakanban.firebaseapp.com/</div>
    <div class="control">
      <span class="check"></span>
      <input type="text">
    </div>
  </div>
  </div>
</template>

<style>
#landing {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(to bottom, #242424, #7b7b7b);
}
#title {
  margin:10% auto 8px;
  width: 144px;
  height: 36px;
  font-family: HiraginoSans-W6;
  font-size: 36px;
  font-weight: 400;
  color: #7e7e7e;
}
#underline {
  margin:20px auto;
  width: 500px;
  height: 1px;
  border: solid 1px #777777;
}
#form {
  position:relative;
  margin:90px auto 0px;
  width: 395px;
  height: 46px;
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
  margin-top:7px;
  width: 395px;
  height: 46px;
  border: solid 2px $pinkish-grey;
}
#form .check {
  width: 42px;
  height: 42px;
  top: 23px;
  right: 2px;
  border-radius: 2px;
  background-color: #82b9de;
  background-image: url(./img/check.svg);
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
}
#form input {
  font-family: HiraginoSans-W6;
  font-size: 12px;
  font-weight: 400;
  color: #7e7e7e;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border:solid 2px grey;
  padding-right: 45px;
  padding-left: 20px;
  -moz-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
