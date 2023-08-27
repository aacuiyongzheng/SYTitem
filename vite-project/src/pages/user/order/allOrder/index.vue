<template>

<div class="container">
         <div class="card">

            <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
  
    <div class="option">
      <el-form-item label="就诊人">
         <el-select placeholder="选择所有患者">
           <el-option  ></el-option>
         </el-select>
      </el-form-item>

      <el-form-item label="订单状态">
         <el-select placeholder="选择所有订单状态">
           <el-option  ></el-option>
         </el-select>
      </el-form-item>
    </div>

    <el-table 
    style="margin-bottom: 20px;"
    >
      <el-table-column label="就诊时间" ></el-table-column>
      <el-table-column label="医院"></el-table-column>
      <el-table-column label="科室"></el-table-column>
      <el-table-column label="医生"></el-table-column>
      <el-table-column label="医室服务费"></el-table-column>
      <el-table-column label="就诊人"></el-table-column>
      <el-table-column label="订单状态"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>


    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 10]"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </el-card>

         </div>
</div>

</template>

<script setup lang="ts">
import {reqUserOrderInfo} from '@/api/user/index'
import {useRoute} from 'vue-router'
import {ref,onMounted} from 'vue'
let $route =useRoute()

//当前页码
let pageNo=ref<any>(1)
//页码展示多少条数据
let pageSize=ref<any>(10)
//就诊人id
let patientId=ref<string>('')
//订单状态
let orderStatus=ref<string>('')
//存储全部订单
let allOrderArr=ref<any>({
    "records": [
      {
        "id": 7944,
        "createTime": "2023-08-23 10:53:16",
        "updateTime": "2023-08-23 10:53:16",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "预约成功，待支付"
        },
        "userId": null,
        "outTradeNo": "169275919627019",
        "hoscode": "1000_10",
        "hosname": "航天中心医院",
        "depcode": "200040878_10",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "医师",
        "reserveDate": "2023-08-23",
        "reserveTime": 0,
        "patientId": 194,
        "patientName": null,
        "patientPhone": null,
        "hosRecordId": "3719",
        "number": 110,
        "fetchTime": "2023-08-2309:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-22 15:30",
        "orderStatus": 0
      },
      {
        "id": 7943,
        "createTime": "2023-08-23 10:47:38",
        "updateTime": "2023-08-23 10:47:38",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "预约成功，待支付"
        },
        "userId": 119,
        "outTradeNo": "169275885845446",
        "hoscode": "1000_10",
        "hosname": "航天中心医院",
        "depcode": "200040878_10",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "医师",
        "reserveDate": "2023-08-24",
        "reserveTime": 0,
        "patientId": 2706,
        "patientName": "神",
        "patientPhone": "110",
        "hosRecordId": "3718",
        "number": 110,
        "fetchTime": "2023-08-2409:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-23 15:30",
        "orderStatus": 0
      },
      {
        "id": 7942,
        "createTime": "2023-08-23 10:47:37",
        "updateTime": "2023-08-23 10:47:37",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "预约成功，待支付"
        },
        "userId": 6911,
        "outTradeNo": "169275885749897",
        "hoscode": "1000_10",
        "hosname": "航天中心医院",
        "depcode": "200040878_10",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "副主任医师",
        "reserveDate": "2023-08-26",
        "reserveTime": 0,
        "patientId": 3122,
        "patientName": "李",
        "patientPhone": "",
        "hosRecordId": "3717",
        "number": 1,
        "fetchTime": "2023-08-2609:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-25 15:30",
        "orderStatus": 0
      },
      {
        "id": 7941,
        "createTime": "2023-08-23 10:46:59",
        "updateTime": "2023-08-23 10:47:00",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "预约成功，待支付"
        },
        "userId": 6911,
        "outTradeNo": "169275881954612",
        "hoscode": "1000_10",
        "hosname": "航天中心医院",
        "depcode": "200040878_10",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "副主任医师",
        "reserveDate": "2023-08-25",
        "reserveTime": 0,
        "patientId": 3122,
        "patientName": "李",
        "patientPhone": "",
        "hosRecordId": "3716",
        "number": 1,
        "fetchTime": "2023-08-2509:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-24 15:30",
        "orderStatus": 0
      },
      {
        "id": 7940,
        "createTime": "2023-08-23 10:46:17",
        "updateTime": "2023-08-23 10:46:18",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "预约成功，待支付"
        },
        "userId": 6911,
        "outTradeNo": "169275877755469",
        "hoscode": "1000_10",
        "hosname": "航天中心医院",
        "depcode": "200040878_10",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "副主任医师",
        "reserveDate": "2023-08-23",
        "reserveTime": 0,
        "patientId": 3121,
        "patientName": "罗",
        "patientPhone": "139",
        "hosRecordId": "3715",
        "number": 1,
        "fetchTime": "2023-08-2309:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-22 15:30",
        "orderStatus": 0
      },
      {
        "id": 7939,
        "createTime": "2023-08-23 10:43:58",
        "updateTime": "2023-08-23 10:43:58",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "预约成功，待支付"
        },
        "userId": 6756,
        "outTradeNo": "169275863794485",
        "hoscode": "1000_3",
        "hosname": "北京大学人民医院",
        "depcode": "200040878_3",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "副主任医师",
        "reserveDate": "2023-08-23",
        "reserveTime": 0,
        "patientId": 2707,
        "patientName": "小明",
        "patientPhone": "15888108888",
        "hosRecordId": "3714",
        "number": 1,
        "fetchTime": "2023-08-2309:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-22 15:30",
        "orderStatus": 0
      },
      {
        "id": 7938,
        "createTime": "2023-08-23 10:41:15",
        "updateTime": "2023-08-23 10:41:15",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "取消预约"
        },
        "userId": null,
        "outTradeNo": "16927584754289",
        "hoscode": "1000_10",
        "hosname": "航天中心医院",
        "depcode": "200040878_10",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "医师",
        "reserveDate": "2023-08-24",
        "reserveTime": 0,
        "patientId": 1,
        "patientName": null,
        "patientPhone": null,
        "hosRecordId": "3713",
        "number": 110,
        "fetchTime": "2023-08-2409:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-23 15:30",
        "orderStatus": -1
      },
      {
        "id": 7937,
        "createTime": "2023-08-23 10:39:09",
        "updateTime": "2023-08-23 10:39:10",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "取消预约"
        },
        "userId": null,
        "outTradeNo": "169275834983819",
        "hoscode": "1000_10",
        "hosname": "航天中心医院",
        "depcode": "200040878_10",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "医师",
        "reserveDate": "2023-08-24",
        "reserveTime": 0,
        "patientId": 1,
        "patientName": null,
        "patientPhone": null,
        "hosRecordId": "3712",
        "number": 110,
        "fetchTime": "2023-08-2409:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-23 15:30",
        "orderStatus": -1
      },
      {
        "id": 7936,
        "createTime": "2023-08-23 10:38:06",
        "updateTime": "2023-08-23 10:38:07",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "已支付"
        },
        "userId": 6756,
        "outTradeNo": "169275828684715",
        "hoscode": "1000_3",
        "hosname": "北京大学人民医院",
        "depcode": "200040878_3",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "副主任医师",
        "reserveDate": "2023-08-24",
        "reserveTime": 0,
        "patientId": 2707,
        "patientName": "小明",
        "patientPhone": "15888108888",
        "hosRecordId": "3711",
        "number": 1,
        "fetchTime": "2023-08-2409:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-23 15:30",
        "orderStatus": 1
      },
      {
        "id": 7935,
        "createTime": "2023-08-23 10:30:00",
        "updateTime": "2023-08-23 10:30:00",
        "isDeleted": 0,
        "param": {
          "orderStatusString": "预约成功，待支付"
        },
        "userId": null,
        "outTradeNo": "169275780047447",
        "hoscode": "1000_12",
        "hosname": "北京市隆福医院",
        "depcode": "200040878_12",
        "depname": "多发性硬化专科门诊",
        "scheduleId": null,
        "title": "医师",
        "reserveDate": "2023-08-24",
        "reserveTime": 0,
        "patientId": 1,
        "patientName": null,
        "patientPhone": null,
        "hosRecordId": "3710",
        "number": 110,
        "fetchTime": "2023-08-2409:00前",
        "fetchAddress": "一层114窗口",
        "amount": 100,
        "quitTime": "2023-08-23 15:30",
        "orderStatus": 0
      }
    ],
    "total": 3712,
    "size": 10,
    "current": 1,
    "orders": [],
    "hitCount": false,
    "searchCount": true,
    "pages": 372
  })
//存储订单总数
let total =ref<number>(0)



onMounted(()=>{
      getUserInfo()
})

//获取用户订单数据
const getUserInfo=async()=>{
      let result:any =await reqUserOrderInfo(pageNo.value,pageSize.value)
      if(result.status==200){
         console.log(result);
         
         allOrderArr.value=result.data.data
         total.value=result.data.data.total
      }
}




</script>

<style lang="scss" scoped>
.container{
   .card{
      margin: 30px;
      margin-top: 50px;

      .option{
         display: flex;

         :deep(.el-form-item){
            margin-right: 40px;
         }
      }
   }
}
</style>