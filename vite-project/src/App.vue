<template>
  <div class="container">
    <HosptialTop/>
    
    <div class="content">
        <router-view></router-view>
    </div>

    <HosptialTottom/>

    <Login v-if="userStore.dialogFlag"/>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user.ts'
let userStore=useUserStore()
</script>

<style scoped lang="scss">
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content{
  min-height: 700px;
  margin-top: 70px;
  width: 1200px;

}
</style>