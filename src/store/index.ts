import { createPinia, defineStore } from 'pinia'

export const demo = defineStore('demo', {
    state: () => {
        return {
            count: 0,
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2
        }
    },
    actions: {
        addCount() {
            this.count++
        }
    }
})

const pinia = createPinia()

export default pinia