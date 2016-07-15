<template>
  <sticky v-for="(key, snapshot) in stickies" :ref="snapshot.ref" :sticky="snapshot.val()"></sticky>
</template>

<script>
import sticky from './Sticky.vue'

export default {

  components: { sticky },

  props: ['ref'],

  data() {
    return {
      stickies: {}
    }
  },

  ready() {
    let query = this.ref.orderByKey()
    query.on('value', snapshot => {
      this.stickies = {}
      snapshot.forEach(child => {
        this.stickies[child.key] = child
      })
    })
  }
}
</script>
