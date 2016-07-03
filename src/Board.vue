<template>
  <sticky v-for="sticky in stickies" :snapshot="sticky" :sticky="sticky.val()"></sticky>
</template>

<script>
import sticky from './Sticky.vue'

export default {

  components: { sticky },

  props: ['ref'],

  data() {
    return {
      stickies: []
    }
  },

  ready() {
    let query = this.ref.orderByKey()
    query.on('value', snapshot => {
      this.stickies = []
      snapshot.forEach(child => {
        this.stickies.push(child)
      })
    })
  }
}
</script>
