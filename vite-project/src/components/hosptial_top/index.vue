<template>
         <div class="top">
            <div class="content">
               <div class="left"  @click="goHome">
                  <img src="../../assets//images//logo.png" alt="">
                  <p>商医通 预约挂号统一平台</p>
               </div>
               
               <div class="right">
                  <p>帮助中心</p>
                  <p @click="changeScrene" v-if="!userStore.userInfo.name">登录/注册</p>
                  <el-dropdown v-else>
    <span class="el-dropdown-link">
      {{ userStore.userInfo.name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>实名认证</el-dropdown-item>
        <el-dropdown-item>挂号订单</el-dropdown-item>
        <el-dropdown-item>就诊人管理</el-dropdown-item>
        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
               </div>
            </div>
         </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user.ts'
let userStore=useUserStore()
let $router =useRouter()

const goHome=()=>{
   $router.push({path:'/home'})
}

const changeScrene=()=>{
   userStore.dialogFlag =true
}

//退出登录
const logOut=()=>{
   userStore.logOut()
   $router.push('/home')
}
</script>

<style scoped lang="scss">
.top{
   background-color: white;
   position: fixed;
   z-index: 999;
   width: 100%;
   height: 70px;
   display: flex;
   justify-content: center;
   .content{
      width: 1200px;
      height: 70px;
      display: flex;
      justify-content: space-between;

      .left{
         display: flex;
         align-items: center;
         img{
            width: 70px;
            height: 70px;
            margin-right: 10px;
         }
         p{
            font-size: 20px;
            color: #6D88B5;
         }
      }

      .right{
         display: flex;
         align-items: center;
         font-size: 16px;
         color: #bbb;
         p{
            margin-right: 10px;
         }
      }
   }
}
</style>