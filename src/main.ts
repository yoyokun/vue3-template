import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import pinia, { demo } from '@/store'
// plugins插件
import plugins from '@/plugins'
// i18n
import { createI18n } from 'vue-i18n'
// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// 自定义指令
import { setupDirectives } from '@/directives';

// Vuetify
const vuetify = createVuetify({
    components,
    directives,
})

// i18n
const i18n = createI18n({
    // something vue-i18n options here ...
    globalInjection: true, // global options
    legacy: false, // you must set `false`, to use Composition API
    locale: 'en', // set locale
    messages: {
        en:{
            title:'i am groot'
        }
    }, // set locale messages
})

const app = createApp(App)

// 注册自定义指令
setupDirectives(app)

// 全局getCurrentInstance 组合式API
app.config.globalProperties.$globalObj = 'globalObj'

app.use(pinia).use(router).use(vuetify).use(i18n).use(plugins, { demo: 'demo' }).mount('#app')

// provide/inject透传 全局
// pinia
const store = demo()
app.provide('store', readonly(store))
app.provide('app', readonly(app))