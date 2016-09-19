<template>
<div class="sticky" v-bind:class="{ dragging: dragging}" v-bind:style="stickyStyle" v-on:mousedown="mouseDown" v-on:mouseup="mouseUp" v-on:mouseleave="mouseLeave" v-on:mouseleave="mouseUp" v-on:mousemove="mouseMove">
  <div class="position">
    <textarea v-model="sticky.text" debounce="100">
      </textarea>
  </div>

  <div class="colors">
    <label class="color" v-for="color in colors" v-bind:style="{color: color}">
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
      layerPos: {
        x: 0,
        y: 0
      },
      lastPos: {
        x: 0,
        y: 0
      },
      colors: ['#43F2FF', '#C2FF9B', '#65F088', '#FFC073', '#FC7A2B', '#eee']
    }
  },

  watch: {
    'sticky.color' () {
      this.ref.update({
        color: this.sticky.color
      })
    },
    'sticky.text' () {
      this.ref.update({
        text: this.sticky.text
      })
    }
  },

  computed: {

    // determines the style of the DOM object from the data
    stickyStyle() {
      return {
        backgroundColor: this.sticky.color,
        transform: 'rotate(' + (this.sticky.rotate || 0) + 'deg)',
        left: (100 * this.sticky.position.left || 0) + '%',
        top: (100 * this.sticky.position.top || 0) + '%',
      };
    }
  },

  methods: {

    // triggered by the [x] in the top right corner
    deleteSticky(e) {
      e.preventDefault()
      this.ref.remove()
    },

    // triggered on mousedown
    mouseDown(e) {
      e.cancelBubble = true
      this.dragging = true
      this.layerPos.x = this.$el.offsetWidth / 2 - e.pageX + this.$el.offsetLeft
      this.layerPos.y = this.$el.offsetHeight / 2 - e.pageY + this.$el.offsetTop
    },

    // triggered on mouse move
    mouseMove(e) {
      e.cancelBubble = true
      e.preventDefault()
      if (this.dragging) {
        this.sticky.position = {
          left: (e.pageX + this.layerPos.x) / window.innerWidth,
          top: (e.pageY + this.layerPos.y) / window.innerHeight
        }
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
      if (this.dragging)
        this.mouseLeave(e)
      e.cancelBubble = true
    },

  }

}

</script>


<style>
.sticky {
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  display: inline-block;
  width: 200px;
  height: 160px;
  margin-left: -100px;
  margin-top: -80px;
  cursor: move;
  position: absolute;
  background-color: #eee;
  transition-duration: 1s;
  transition-property: left top transform;
}

.sticky:before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.1));
  /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.1));
  /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.1));
  /* For Firefox 3.6 to 15 */
  background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.1));
  /* Standard syntax */
}

.sticky.dragging {
  box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.3);
  z-index: 1;
  transition-property: none;
}

.sticky .position {
  position: absolute;
  display: table;
  cursor: move;
  left: 0;
  top: 0;
  width: 80%;
  height: 100%;
}

.sticky textarea {
  outline: none;
  resize: none;
  text-align: center;
  font-size: 20px;
  background: none;
  width: 100%;
  height: 100%;
  border: none;
  padding: 8px;
  font-family: 'Neucha', cursive;
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
  color: rgba(0, 0, 0, 0.5);
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  opacity: 0;
  transition: opacity 0.5s;
}

.textarea:focus,
input:focus {
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

.colors .color:hover {
  opacity: 1;
}

.color input {
  position: absolute;
  left: 10px;
  line-height: 10px;
  opacity: 0.5;
}

</style>
