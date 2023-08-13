<template>
 
 <div class="level">
  <h1>医院</h1>
  <div class="content">
   <div class="left">
    等级:
   </div>
   <div class="right">
      <ul class="list">
        <li :class="{active:activeFlag==''}">全部</li>
        <li v-for="(level,index) in levelList" :class="{active:activeFlag==level.value}" @click="changeLevel(level.value)" :key="level.value" >{{level.name}}</li>

      </ul>
   </div>
  </div>
 </div>
   
</template>

<script setup  lang="ts">
import type {} from '@/api/home/type'
import {reqHospitalLevelAndRegion} from '@/api/home/index'
import { onMounted,ref } from 'vue';

let $emit =defineEmits(['levelJump'])

let levelList =ref<any>([])
let activeFlag =ref<string>('')

onMounted(()=>{
    getLevel()
})


//获取等级数据
const getLevel=async()=>{
  let result:any =await reqHospitalLevelAndRegion('HosType')
  if(result.status==200){
    levelList.value = result.data.data
  }
}

//切换active按钮高亮
const changeLevel=(value:string)=>{
  activeFlag.value=value
  $emit('levelJump',value)
}
</script>

<style lang="scss" scoped>

.level{
 color: #7f7f7f;
 margin-top: 10px;
  h1{
   font-weight: 900;
  }

 .content{
  display: flex;
  margin: 10px 0;

  .right{
   margin-left: 10px;
   .list{
    display: flex;

    .active{
     color: #55a6fe;
    }
    li:hover{
     color: #55a6fe;
     cursor: pointer;
    }
    li{
     margin-left: 10px;
    }
   }
  }
 }
}
</style>