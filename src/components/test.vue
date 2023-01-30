<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
// props
const props = defineProps({
  msg: { type: [String, Number], default: '' },
})
// inject
const testObj = inject('testObj', '')
console.log(testObj)
// watch
watch([() => props.msg, () => testObj], (newValue, oldValue) => {
  console.log(newValue, oldValue)
}, { deep: true, immediate: true })
onUpdated(() => {
  console.log(props.msg)
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
