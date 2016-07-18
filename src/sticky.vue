<template>

  <div
      class="sticky"
      v-bind:class="{ dragging: dragging}"
      v-bind:style="stickyStyle"
      v-on:mousedown="mouseDown"
      v-on:mouseup="mouseUp"
      v-on:mouseleave="mouseLeave"
      v-on:mouseleave="mouseUp"
      v-on:mousemove="mouseMove">
    <textarea
      v-on:blur="updateText"
      v-model="sticky.text"></textarea>

    <div class="colors">
      <label
        class="color"
        v-for="color in colors"
        v-bind:style="{'color': color}">
        <input
          type="radio"
          name="color"
          v-model="sticky.color"
          :value="color">
      </label>
    </div>

    <a class="delete-button" v-on:click="deleteSticky" href="#">×</a>

  </div>

</template>


<script>
export default {
  props: ['ref', 'sticky'],

  data() {
    return {
      dragging: false,
      lastPos: { x: 0, y: 0 },
      colors: ['#fce', '#fec', '#efc', '#cfe', '#cef', '#eee']
    }
  },

  watch: {
    'sticky.color'() {
      this.ref.update({color: this.sticky.color})
    }
  },

  computed: {

    // determines the style of the DOM object from the data
    stickyStyle() {
      return {
        backgroundColor: this.sticky.color,
        transform: 'rotate(' + (this.sticky.rotate || 0) + 'deg)',
        left: (100 * this.sticky.position.left||0) + '%',
        top: (100 * this.sticky.position.top||0) + '%'
      }
    }
  },

  methods: {

    // triggered when the sticky text is updated
    updateText() {
      this.ref.update({text: this.sticky.text})
    },

    // triggered by the [x] in the top right corner
    deleteSticky(e) {
      e.preventDefault()
      this.ref.remove()
    },

    // triggered on mousedown
    mouseDown(e) {
      e.cancelBubble = true
      this.dragging = true
    },

    // triggered on mouse move
    mouseMove(e) {
      e.cancelBubble = true
      e.preventDefault()
      if(this.dragging){
        this.sticky.position.left = (e.pageX) / window.innerWidth
        this.sticky.position.top = (e.pageY) / window.innerHeight
      }
    },

    // triggered on mouse leave
    mouseLeave(e) {
      if (this.dragging) {
        this.ref.update({
          position: this.sticky.position,
          rotate: this.sticky.rotate
        })
      }
      this.dragging = false
    },

    // triggered on button up, calls mouseLeave
    mouseUp(e) {
      if (this.dragging) {
        this.mouseLeave(e)
      }
      e.cancelBubble = true
    },

  }

}
</script>


<style>
.sticky {
  box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  border-radius: 3px;
  display: inline-block;
  width: 200px;
  min-height: 160px;
  margin-left: -100px;
  margin-top: -80px;
  cursor: move;
  position: absolute;
  background-color: #eee;
}

.sticky.dragging {
  box-shadow: 6px 6px 20px rgba(0,0,0,0.3);
  z-index: 1;
}

.sticky textarea {
  position: absolute;
  cursor: move;
  left: 0;
  top: 0;
  width: 80%;
  height: 100%;
  text-align: center;
  border: none;
  background: none;
  font-size: 20px;
  font-family: "Times new roman";
  display: table-cell;
  vertical-align: middle;
}

.sticky .delete-button {
  text-decoration: none;
  position: absolute;
  right: 10px;
  top: 10px;
  font-weight: bold;
  border: none;
  background: none;
  opacity: 0.5;
  color: rgba(0,0,0,0.5);
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  opacity: 0;
  transition: opacity 0.5s;
}

textarea:focus, input:focus{
  outline: none;
}

.sticky:hover .delete-button {
  opacity: 0.5;
}

.colors {
  position: absolute;
  bottom: 5px;
  right: 5px;
  transform: rotate(90deg);
  transform-origin: 90% 50%;
}

.colors .color {
  display: inline-block;
  text-align: center;
  border: 5px solid currentColor;
  border-radius: 50% 50%;
  position: relative;
  width: 5px;
  height: 5px;
  margin: 2px;
  overflow: hidden;
  transition: opacity 0.5s;
  opacity: 0;
}

.colors:hover .color {
  opacity: 1;
}

.colors .color:hover{
  opacity: 1;
}

.color input {
  position: absolute;
  left: 10px;
  line-height: 10px;
  opacity: 0.5;
}

</style>
