<template>
      <div class="container">
       <div class="title">
        确诊挂号信息
       </div>

       <div class="content">
        <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>请选择确诊人</span>
        <el-button class="button"  type="primary" :icon="User">添加就选人</el-button>
      </div>
    </template>
    
      <div class="user">
         <Visitor @click="changeIndex(index)"  v-for="(item,index) in userArr" :key="item.id" class="item" :user="item" :index="index" :currentIndex="currentIndex"/>
      </div>

  </el-card>
       </div>


       <div class="descr">
        <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号信息</span>
      </div>
    </template>

    <el-descriptions
    class="margin-top"

    :column="2"
  
    border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊日期:
        </div>
      </template>
      {{ docArr.updateTime }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊医院:
        </div>
      </template>
      {{ docArr.param?.hosname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊科室:
        </div>
      </template>
      {{ docArr.param?.depname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生姓名:
        </div>
      </template>
      {{ docArr.docname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生职称:
        </div>
      </template>
      {{ docArr.title }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生专长:
        </div>
      </template>
      {{ docArr.skill }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生服务费:
        </div>
      </template>
      {{ docArr.amount }}
    </el-descriptions-item>
  </el-descriptions>

  </el-card>
       </div>


       <div class="btn">
        <el-button type="primary" :disabled="currentIndex==-1?true:false">确认挂号</el-button>
       </div>

      </div>

</template>

<script setup lang="ts">
import {reqUserInFO,reqDoctor} from '@/api/search/index'
import {User} from '@element-plus/icons-vue'
import Visitor from '@/pages/hosptial/register/visitor.vue'
import { onMounted,ref } from 'vue';
import {useRoute} from 'vue-router'
let $route =useRoute()
let userArr=ref<any>([])
let docArr=ref<any>({})
let currentIndex=ref<number>(-1)
onMounted(()=>{
  //获取就诊人信息
  getData()
  //获取医生就诊信息
  getDoctorData()
})

//获取就诊人信息
const getData=async()=>{
        let result =await reqUserInFO()
     if(result.status==200){
      userArr.value=result.data.data
     }
     
        
}

//获取医生就诊信息
const getDoctorData=async()=>{
    let result =await reqDoctor($route.query.docId as string)
    if(result.status==200){
      docArr.value=result.data.data
    }
}

//点击就诊人信息
const changeIndex=(index:any)=>{
  currentIndex.value=index
}
</script>

<style lang="scss" scoped>
.container{
 margin: 20px 40px;
 .title{
  font-size: 20px;
  font-weight: 600;
  color: #7f7f7f;
  margin-bottom: 20px;
 }

 .content{
  .card-header{
   font-size: 15px;
   display: flex;
   justify-content: space-between;
   span{
    margin-top: 10px;
   }

 
  }


   .user{
    display: flex;
    flex-wrap: wrap;
    .item{
     width: 32%;
     margin: 5px;
    }
   }
  
 }

 .descr{
  margin-top: 20px;
 }

 .btn{
  margin-top: 20px;
  margin-left: 350px;

  :deep(.el-button){
    width: 180px;
    height: 35px;
  }
 }
}
</style>