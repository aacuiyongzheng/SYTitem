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
   component:()=>import('@/pages/hosptial/index.vue'),
   children:[
    {
     path:'register',
     component:()=>import('@/pages/hosptial/register/index.vue')
    },
    {
     path:'detail',
     component:()=>import('@/pages/hosptial/detail/index.vue')
    },
    {
     path:'notice',
     component:()=>import('@/pages/hosptial/notice/index.vue')
    },
    {
     path:'close',
     component:()=>import('@/pages/hosptial/close/index.vue')
    },
    {
     path:'search',
     component:()=>import('@/pages/hosptial/search/index.vue')
    },
    {
     path:'register_step1',
     component:()=>import('@/pages/hosptial/register/register_step1.vue')
    }
   ]
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