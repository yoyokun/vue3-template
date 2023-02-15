<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <h1>{{ $t('title') }}</h1>
    <div>{{ testObj.name }}</div>
    <div v-for="item in desserts">{{ item.name }}</div>
    <div @click="clickEvent" v-throttle>{{ msg }}<v-icon icon="mdi-antenna" color="light-blue"></v-icon></div>
    <div>{{ msgComputed }}</div>
    <demo-slot ref="dom" class="demo-slot" :msg="msg" @change="handleEmit">test slot</demo-slot>
    <!-- <DemoS :msg="msg" /> -->
    <!-- 动态组件 -->
    <!-- <component :is="someCondition ? demoSlot : DemoS" /> -->
    <div class="" @click="storePatch">{{ store.count }}</div>
  </div>
</template>

<script setup lang="ts">
// components 可全局(详见components.d.ts)
// import DemoS from '@/components/demoSlot.vue'
import { ComponentInternalInstance } from 'vue';

// api
import { getAnimal } from '@/api/demo';

getAnimal({}).then((res: any) => {
  console.log(res);
});

// 自定义指令
const vMyDirective = {
  beforeMount: (el: any) => {
    // 在元素上做些操作
  }
}

// globalProperties全局对象
const { appContext: { config: { globalProperties } } } = getCurrentInstance() as ComponentInternalInstance
// console.log(globalProperties.$globalObj)
console.log(globalProperties?.$globalObj)

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

// provide 可透传下级
provide('testObj', readonly(testObj))
const store = inject<any>('store', {})
const app = inject<any>('app', {})
console.log('app=>', app)

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

// watchEffect
const stopWatch = watchEffect(() => {
  console.log('watchEffect=>', msg.value)
})

// 生命周期
console.log('created')
onBeforeMount(() => {
  console.log('onBeforeMount')
})

// dom节点
const dom = ref()
// const dom = ref<InstanceType<typeof TestSlot> | null>(null)
// const dom = ref<ReturnType<typeof TestSlot> | null>(null)
onMounted(() => {
  console.log('onMounted')
  // dom.value.
  dom.value.slotMethod()
  console.log('dom=>', dom.value)

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
  console.log('click methods=>节流防抖', e)
  msg.value = 'new message'
  nextTick(() => {
    // 访问更新后的 DOM
  })
  stopWatch()
}

const handleEmit = (e: any) => {
  console.log(e)
}

// pinia
const storePatch = (e: any) => {
  // store.$patch({
  //   count: 99,
  // })
  store.addCount()
}

</script>
