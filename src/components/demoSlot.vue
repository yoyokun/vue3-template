<template>
  <div @click="increment">{{ msg }} {{ count }} {{ double }}</div>
  <!-- 递归组件 -->
  <!-- <DemoSlotChild></DemoSlotChild> -->
  <div @click="emitTest" class="text">emit methods</div>
  <div>
    <slot></slot>
  </div>
  <!-- 透传Attributes -->
  <!-- <main v-bind="$attrs">...</main> -->

</template>

<!-- 选项式 API 旧写法 -->
<!-- 禁用 Attributes 继承 如 class style -->
<script lang="ts">
interface ComponentPublicInstance {
  $data: object
}
// 使用普通的 <script> 来声明选项
// import DemoSlotChild from './demoSlot.vue'
export default {
  name: 'demoSlot', // 组件名称
  inheritAttrs: true, // attribute 透传
  // components: {DemoSlotChild}, // 组件注册
  directives: {
    focus: {
      mounted(el: any) {
        el.focus()
      }
    }
  }
}
</script>

<!-- 组合式 API 新写法 -->
<script setup lang="ts">
// 递归组件
// import DemoSlotChild from './demoSlot.vue'

// hooks替代mixins
import hooksDemo from "@/hooks/demo"
const { count, double, increment } = hooksDemo()

console.log('useSlots=>', useSlots(), 'useAttrs=>', useAttrs(), 'useCssModule=>', useCssModule())

// props
const props = defineProps({
  msg: { type: [String, Number], default: '' },
})

// inject
const testObj = inject('testObj', '')
console.log('provide & inject=>', testObj)

// watch
watch([() => props.msg, () => testObj], (newValue, oldValue) => {
  console.log('watch=>', newValue, oldValue)
}, { deep: true, immediate: true })
onUpdated(() => {
  console.log('updated=>', props.msg)
})

// emit
const emit = defineEmits(['change', 'delete'])

// methods
const slotMethod = () => {
  console.log('slot methods test')
}

const emitTest = () => {
  emit('change', 'test emit methods')
}

// expose methods
defineExpose({
  slotMethod,
})

const color: string = 'red'

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.text {
  color: v-bind(color);
}
</style>
