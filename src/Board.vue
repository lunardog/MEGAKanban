<template>
  <sticky
  v-for="(key, snapshot) in stickies"
  :ref="snapshot.ref"
  :sticky="snapshot.val()"></sticky>
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
    // get stickies, ordered by key
    let query = this.ref.orderByKey()

    // whenever value updates
    query.on('value', snapshot => {
      // reset the `stickies` object
      this.stickies = {}
      // fill with child snapshots
      snapshot.forEach(child => {
        this.stickies[child.key] = child
      })
    })
  }
}
</script>
