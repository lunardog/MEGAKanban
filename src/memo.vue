
<template>
  <div
      class="memo"
      v-bind:class="{ dragging: dragging}"
      v-bind:style="position"
      v-on:mousedown="mouseDown"
      v-on:mouseup="mouseUp"
      v-on:mouseexit="mouseUp"
      v-on:mousemove="mouseMove">
    <textarea
      v-on:blur="updateText"
      v-model="memo.text"></textarea>
    <a class="delete-button" v-on:click="deleteMemo" href="#">x</a>
    <div class="colors">
      <input type="radio" name="color" v-model="memo.color" value="#ffee99">
      <input type="radio" name="color" v-model="memo.color" value="#ff99ee">
      <input type="radio" name="color" v-model="memo.color" value="#ee99ff">
      <input type="radio" name="color" v-model="memo.color" value="#99eeff">
      <input type="radio" name="color" v-model="memo.color" value="#99ffee">
      <input type="radio" name="color" v-model="memo.color" value="#eeff99">
    </div>
  </div>
</template>


<script>
export default {
  props: ['memo', 'ref'],

  data() {
    return {
      dragging: false
    }
  },

  watch: {
    'memo.color'() {
      this.ref.update({
        color: this.memo.color
      })
    }
  },

  computed: {
    position() {
      return this.memo.position ?
        {
          left: this.memo.position.left + 'px',
          top: this.memo.position.top + 'px',
          backgroundColor: this.memo.color,
        } : {left: '10px', top: '10px' }
    }
  },

  methods: {

    updateText() {
      this.ref.update({
        text: this.memo.text
      })
    },

    deleteMemo(e) {
      e.preventDefault()
      this.ref.remove()
    },

    mouseDown(e) {
      e.cancelBubble = true
      this.dragging = true
    },

    mouseMove(e) {
      e.cancelBubble = true
      e.preventDefault()
      if(this.dragging){
        this.memo.position.left += e.movementX
        this.memo.position.top += e.movementY
      }
    },

    mouseUp(e) {
      e.cancelBubble = true
      this.ref.update({
        position: this.memo.position
      })
      this.dragging = false
    },

  }

}
</script>


<style>
.memo {
  box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  border: 1px solid silver;
  display: inline-block;
  width: 200px;
  min-height: 160px;
  -webkit-transform: translate(-50%, -50%, 0);
  cursor: move;
  position: absolute;
  background-color: #eee;
}

.memo.dragging {
  box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
}

.memo textarea {
  position: absolute;
  cursor: move;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  background: none;
  font-size: 20px;
  font-family: "Times new roman";
  display: table-cell;
  vertical-align: middle;
}

.memo .delete-button {
  text-decoration: none;
  display: none;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  opacity: 0.5;
}

textarea:focus, input:focus{
    outline: none;
}

.memo:hover .delete-button, .memo:hover .colors{
  display: block;
}

.colors {
  position: absolute;
  bottom: 0px;
  display: none;
}

</style>
