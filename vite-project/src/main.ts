import { createApp } from 'vue'
import App from '@/App.vue'
import '@/style/reset.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import HosptialTop from '@/components/hosptial_top/index.vue'
import HosptialTottom from '@/components/hosptial_bottom/index.vue'
import router from '@/router'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const app =createApp(App)


app.component('HosptialTop',HosptialTop)
app.component('HosptialTottom',HosptialTottom)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(ElementPlus)
app.use(router)

app.mount('#app')

