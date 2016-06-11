<template>
  <h2>{{ memo.date }}</h2>
  <p>{{ memo.text }}</h2>
</template>

<script>
export default {
  props: ['memo'],
  data() {
    return {}
  }
}
</script>

<style>
</style>
