<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  msg: { type: String, default: '' },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
