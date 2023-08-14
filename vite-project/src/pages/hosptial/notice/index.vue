<template>
      <div class="notice">
         <div class="title">
            {{ hosptialStore.hosptialInfo.hospital?.hosname }}预约挂号须知
         </div>

         <div class="content">
            <div class="first">
               为方便您早日就医康复,请您认真阅读预约挂号须知:
            </div>

            <div class="second">
               <h1>一、预约实名制:</h1>
               <div>1.准备好身份证，如果有医保卡的要携带医保卡；</div>

               <h1>二、预预约挂号:</h1>
               <div>2.要到医院挂号室排队，准备挂号；</div>

               <h1>三、挂号选择</h1>
               <div>3.根据疾病症状，选择相应的科系及选择信任的专家挂号。如发热要挂感染科；咳嗽要挂呼吸科；心脏不舒服，要挂心内科；腹痛要挂外科；</div>

               <h1>四、爽约流程</h1>
               <div>如果预约成功后未到医院就医,累计三次以上,90天内不能从211平台上预约挂号;爽约6次,180天内不能从211平台上预约挂号;</div>
            </div>
         </div>
      </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hosptialDetail.ts'
let hosptialStore=useDetailStore()
</script>

<style scoped lang="scss">
.notice{
   margin-left: 40px;
   margin-top: 40px;

   .title{
      font-size: 30px;
      font-weight: 900; 
      margin-left: 200px;
      margin-top: 10px;
   }

   .content{
      .first{
         color: #7f7f7f;
         margin: 10px 0;
         font-size: 16px;
      }

      .second{
         h1{
            color: red;
            font-size: 20px;
            margin-bottom: 15px;
         }

         div{
            margin-bottom: 10px;
            color: #7f7f7f;
            font-size: 16px;
         }
      }
   }
}
</style>