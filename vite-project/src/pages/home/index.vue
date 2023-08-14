<template>

 <Carsouel></Carsouel>
 <Search></Search>

 <el-row :gutter="20">
  <el-col :span="20">
   <Level @levelJump="levelJump"></Level>
   <Region @regionJump="regionJump"></Region>
   <div class="hosptial" v-if="hasHosptialArr.length>0">
    <Card class="item" v-for="(item,index) in hasHosptialArr" :key="index" :hasHosptialInfo="item"></Card>
   </div>

   <el-empty description="暂无数据" v-else/>

   <el-pagination
 class="pag"
     v-model:current-page="pageNo"
     v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-col>
  <el-col :span="4">
      <News></News>
  </el-col>
 </el-row>




</template>

<script setup lang="ts">
import Carsouel from '@/pages/home/carsouel/index.vue'
import Search from '@/pages/home/search/index.vue'
import Level from '@/pages/home/level/index.vue'
import Region from '@/pages/home/region/index.vue'
import Card from '@/pages/home/card/index.vue'
import News from '@/pages/home/news/index.vue'
import {reqHospital} from '@/api/home/index.ts'
import {ref,onMounted} from 'vue'

let pageNo=ref<number>(1)
let pageSize=ref<number>(10)
//存储医院 已有数据
let hasHosptialArr =ref([])
let total =ref<number>(0)
let hostype=ref<string>('')
let districtCode=ref<string>('')
onMounted(()=>{
    getHosptialInfo()
    

})

//获取医院信息
const  getHosptialInfo=async()=>{
    let result:any =await  reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value)
    
    if(result.status==200){

      hasHosptialArr.value =result.data.data.content
      total.value =result.data.data.totalElements
      
    }
   
}

//点击页面按钮的时候
const handleCurrentChange=()=>{
  getHosptialInfo()
}

//点击页面几条的时候
const handleSizeChange=()=>{
  getHosptialInfo()
}

//等级节点跳转
const levelJump =(level:string)=>{
  hostype.value =level

  getHosptialInfo()
}

//地区节点跳转
const regionJump =(region:string)=>{
  
  districtCode.value =region
  getHosptialInfo()
  console.log(1);
  
}


</script>

<style scoped lang="scss">
 .hosptial{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item{
   width: 48%;
   margin-top: 10px;
  }
 }
 .pag{
  margin: 10px 0;
 }
</style>