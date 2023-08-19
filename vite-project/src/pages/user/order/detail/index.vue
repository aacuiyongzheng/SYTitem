<template>

   <div class="card">

      <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号详情</span>
        
      </div>
    </template>
    
    <div class="top">
     
   <el-tag class="ml-2" type="success">
            <div class="tag">
         <svg t="1692414865459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4210" width="20" height="20"><path d="M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z" p-id="4211"></path></svg>
         <span>{{orderInfo.param?.orderStatusString}}</span>
         </div>

      </el-tag>
   

      <div class="r">
         <div class="left">
               <img src="../../../../assets//images//code_app.png" alt="">
         </div>
         <div class="right">
               <p>微信关注"北京114预约挂号"</p>
               <p>"快速预约挂号"</p>
         </div>

      </div>
    </div>

    <div class="bottom">

      <div class="left">
         
      <el-descriptions
    class="margin-top"
    :column="1"
    border
  >

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <user />
          </el-icon>
          就诊人信息
        </div>
      </template>
      {{ orderInfo.patientName }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <iphone />
          </el-icon>
          就诊日期
        </div>
      </template>
      {{ orderInfo.reserveDate }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <location />
          </el-icon>
          就诊医院
        </div>
      </template>
      {{ orderInfo.hosname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <tickets />
          </el-icon>
          就诊科室
        </div>
      </template>
      <el-tag size="small"> {{ orderInfo.depname }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          医生职责
        </div>
      </template>
      {{ orderInfo.title }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          医事服务费
        </div>
      </template>
      {{ orderInfo.amount }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          挂号订单
        </div>
      </template>
      {{ orderInfo.outTradeNo }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          挂号时间
        </div>
      </template>
      {{ orderInfo.createTime }}
    </el-descriptions-item>
  </el-descriptions>

  <div class="btn">
            
            <el-popconfirm title="确定取消预约吗?" v-if="orderInfo.orderStatus==0||orderInfo.orderStatus==1">
    <template #reference>
      <el-button @confirm="cancel">取消预约</el-button>
    </template>
  </el-popconfirm>
            <el-button type="primary" v-if="orderInfo.orderStatus==0" @click="pay">支付</el-button>
         </div>
      </div>

      <div class="right">

         <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>注意事项</span>
      </div>
    </template>
    
      <div class="text">
         <p>1.发热人员需先经过发热门诊筛查，其他人员尽量避开发热门诊、急诊等诊室及其就诊人员。</p>
         <p style="color: red;">2.乘坐电梯时避免拥挤，如体力充沛亦可走楼梯。</p>
         <p>3.排队、交流时，应尽量与他人保持1米以上距离。</p>
         <p>4.如遇叫号等候时间较长，可在室外或室内通风良好的地方等候。</p>
         <p>5.接触医院门把手、扶手、电梯按钮、诊疗台等部位后，及时做好手卫生。</p>
         <p>6.尽量不用手接触眼、口、鼻或他人。</p>
         <p>7.如需使用医院卫生间，做好个人防护，及时洗手或用免洗手消毒剂进行手卫生。</p>
      </div>

  </el-card>


      </div>


        

    </div>

  </el-card>



  
  <div class="dialog">

<el-dialog
v-model="dialogVisible"
title="微信支付"
width="30%"
@close="close"
>

<div class="total">
    <div class="top">
        <img style="width: 200px;height: 200px;margin-left: 110px;" :src="weixinUrl" alt="">
    </div>
    <div class="bottom">
      <p>请使用微信扫一扫</p>
      <p>扫描二维码支付</p>
    </div>
</div>

<template #footer>
<span class="dialog-footer">
  <el-button @click="cancelD">关闭窗口</el-button>

</span>
</template>
</el-dialog>

</div>
   </div>


</template>

<script setup lang="ts">
//@ts-ignore
import QRCode from 'qrcode'
import {reqOrderInfo,reqCancelOrder,reqWeixin,isPay} from '@/api/user/index'
import {useRoute} from 'vue-router'
import { onMounted,ref } from 'vue';
import { ElMessage } from 'element-plus';
let $route =useRoute()
let orderInfo =ref<any>({})
let dialogVisible=ref<boolean>(false)
let weixinUrl=ref<string>('')
let timer =ref<any>(null)
onMounted(()=>{
  getOrderInfo()
})

//获取订单数据
const getOrderInfo=async()=>{
  let result:any =await reqOrderInfo($route.query.orderId as string)
  
  if(result.status==200){
    
    
    orderInfo.value=result.data.data
  }
  
}

//取消预约
const cancel=async()=>{

  try {
    await reqCancelOrder($route.query.orderId as string)
    getOrderInfo()

  } catch (error) {
    ElMessage({
      type:'error',
      message:'取消预约失败'
    })
  }
}

//点击支付按钮
const pay=async()=>{
  dialogVisible.value=true

  let result =await reqWeixin($route.query.orderId as string)
  if(result.status==200){
    weixinUrl.value = await QRCode.toDataURL(result.data.data.codeUrl)
     timer =  setInterval(async()=>{
           let resultt =  await isPay($route.query.orderId as string)
           console.log(resultt);
           
           if(resultt.data.data){
              ElMessage({
                type:'success',
                message:'支付成功'
              })
              dialogVisible.value = false

              getOrderInfo()
              clearInterval(timer)
           }
           
    },2000)
  }
  
}

//关闭窗口
const cancelD=()=>{

  dialogVisible.value = false
  clearInterval(timer)
}

//窗口右上角x
const close=()=>{
  
  dialogVisible.value = false
  clearInterval(timer)
}
</script>

<style lang="scss" scoped>
.card{
   margin: 20px 40px;
   
   .top{
      padding: 10px;
      display: flex;
      justify-content: space-between;

      .tag{
         display: flex;
         justify-content: center;
         align-items: center;
      }

      :deep(.el-tag){
         margin-left: 10px;
      }

      .r{
         display: flex;
         justify-content: space-between;
         .left{
            img{
               width: 40px;
               height: 40px;
            }
         }

         .right{
            margin-left: 8px;
            display: flex;
            flex-direction: column;

            p{
               margin-top: 3px;
            }
         }
      }

      
   }

   .bottom{
      display: flex;
      margin-top: 20px;

      .left{
         flex: 4;
         margin-right: 15px;

         .btn{
            margin-top: 20px;
         }
      }

      .right{
         flex: 6;

         .text{
            p{
               margin-top: 10px;
            }
         }
      }
   }

   .dialog{
    :deep(.el-dialog__body){
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .total{
      .bottom{
        margin-top: 5px;
        margin-left: 165px;
        display: flex;
        flex-direction: column;
        p{
          margin: 4px 0;
        }
      }
    }
   }

}
</style>