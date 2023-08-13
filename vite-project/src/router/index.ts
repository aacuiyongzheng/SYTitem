import {createRouter,createWebHistory} from 'vue-router'

export default createRouter({
 history:createWebHistory(),
 routes:[
  {
   path:'/home',
   component:()=>import('@/pages/home/index.vue')
  },
  {
   path:'/hosptial',
   component:()=>import('@/pages/hosptial/index.vue')
  },
  {
   path:'/',
   redirect:'/home'
  }

 ],
 //路由跳转刚上来的滚动行为
 scrollBehavior(){
  return {
   left:0,
   top:0
  }
 }
})