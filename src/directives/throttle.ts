import { App, Directive } from "vue";

export default function setupThrottleDriective(app: App) {
    /** 定时器 */
    let timer: any = null
    function throttleELfun(el: HTMLElement, throttleTime = 1000) {
        el.addEventListener('click', (event: Event) => {
            if (!timer) {
                timer = window.setTimeout(() => {
                    timer = null
                }, throttleTime)
            } else {
                event?.stopImmediatePropagation()
            }
        }, true)
    }
    const throttleDirective: Directive<HTMLElement> = {
        // // 在绑定元素的 attribute 前
        // // 或事件监听器应用前调用
        // created(el, binding, vnode, prevVnode) {
        //     // 下面会介绍各个参数的细节
        // },
        // // 在元素被插入到 DOM 前调用
        // beforeMount(el, binding, vnode, prevVnode) {},
        // // 在绑定元素的父组件
        // // 及他自己的所有子节点都挂载完成后调用
        // mounted(el, binding, vnode, prevVnode) {},
        // // 绑定元素的父组件更新前调用
        // beforeUpdate(el, binding, vnode, prevVnode) {},
        // // 在绑定元素的父组件
        // // 及他自己的所有子节点都更新后调用
        // updated(el, binding, vnode, prevVnode) {},
        // // 绑定元素的父组件卸载前调用
        // beforeUnmount(el, binding, vnode, prevVnode) {},
        // // 绑定元素的父组件卸载后调用
        // unmounted(el, binding, vnode, prevVnode) {}
        beforeMount(el, bingding) {
            throttleELfun(el, bingding.value)
        },
    }
    app.directive('throttle', throttleDirective)
}