<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <div>{{ testObj.name }}</div>
    <div v-for="item in desserts">{{ item.name }}</div>
    <div @click="clickEvent">{{ msg }}<v-icon icon="mdi-antenna" color="light-blue"></v-icon></div>
    <div>{{ msgComputed }}</div>
    <test :msg="msg" />
  </div>
</template>

<script setup lang="ts">
// data数据
const desserts = reactive([{
  name: 'Frozen Yogurt',
  calories: 159,
}, {
  name: 'Frozen Yogurt',
  calories: 159,
}])
const testObj = reactive({
  name: 'test'
})
const msg = ref<string | number>('old message')
// provide
provide('testObj', readonly(testObj))
// computed
const msgComputed = computed({
  get() {
    return msg.value + ' computed'
  },
  set(val: number | string) {
    msg.value = val
  }
})
// msgComputed.value = '====='
// console.log(msgComputed)
const stopWatch = watchEffect(() => {
  console.log('watchEffect=>', msg.value)
})

// 生命周期
console.log('created')
onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  console.log('onMounted')
})
onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})
onUpdated(() => {
  console.log('onUpdated')
})
onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})
onUnmounted(() => {
  console.log('onUnmounted')
})

// 事件
const clickEvent = (e: object) => {
  console.log(e)
  msg.value = 'new message'
  stopWatch()
}
</script>
