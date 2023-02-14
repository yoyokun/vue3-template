import { ref, computed } from "vue";
export default function() {
    const count = ref<number>(0);
    const double = computed(() => count.value * 2)
    function increment() {
        count.value++;
    }
    return {
        count,
        double,
        increment
    }
}