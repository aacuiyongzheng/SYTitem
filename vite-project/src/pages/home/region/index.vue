<template>
 <div class="region">
   <div class="content">
    <div class="left">
      地区:
    </div>
    <div class="right">
      <ul class="list">
        <li :class="{active:activeFlag==''}">全部</li>
        <li v-for="(item,index) in regionList" :class="{active:activeFlag==item.value}"  @click="changeActive(item.value)" :key="item.value">{{item.name}}</li>

      </ul>
    </div>
   </div>
 </div>
</template>

<script setup lang="ts">
  import type {} from '@/api/home/type'
import {reqHospitalLevelAndRegion} from '@/api/home/index'
import { onMounted,ref } from 'vue';

let $emit =defineEmits(['regionJump'])


let regionList =ref<any>([])
let activeFlag =ref<string>('')
onMounted(()=>{
  getRegion()
})

//获取区域子列表
const getRegion=async()=>{
  let result:any = await reqHospitalLevelAndRegion("Beijin")
  if(result.status==200){
    regionList.value = result.data.data
  }
}

//点击区域active切换高亮
const changeActive=async(value:string)=>{
  activeFlag.value =value
  $emit('regionJump',value)
}
</script>


<style lang="scss" scoped>
.region{
  color: #7f7f7f;
 margin-top: 10px;

 .content{
  display: flex;
  .left{
    margin-right: 10px;
    width: 40px;
  }

  .right{
    margin-top: -9px;
    margin-left: -3px;
    .list{
      display: flex;
      flex-wrap: wrap;

      .active{
        color: #55a6fe;
      }

      li:hover{
        color: #55a6fe;
        cursor: pointer;
      }
      
      li{
        margin-left: 10px;
        margin-top: 10px;
      }
    }
  }
 }
}
</style>