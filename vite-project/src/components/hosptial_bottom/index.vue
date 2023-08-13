<template>
 <div class="bottom">
      <div class="content">

            <div class="left">
               京ICP备 13018369号 电话挂号010-56253825
            </div>

            <div class="right">
               <a href="">联系我们</a>
               <a href="">合作伙伴</a>
               <a href="">用户协议</a>
               <a href="">隐私协议</a>
            </div>
      </div>
 </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.bottom{
   width: 100%;
   height: 50px;
   background-color: #f0f2f5;
   display: flex;
   justify-content: center;
   .content{
      width: 1200px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .right{
         a{
            margin-right: 10px;
         }
      }
   }
}

</style>