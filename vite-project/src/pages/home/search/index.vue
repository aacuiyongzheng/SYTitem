<template>
      <div class="search">

              <el-autocomplete
              v-model="keyword"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              @select="handleSelect"
        clearable
        class="inline-input w-50"
        placeholder="请你输入医院名称"

      />

      <el-button type="primary" :icon="Search">提交</el-button>

      </div>
</template>

<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {reqHospitalKeyword} from '@/api/home/index'
import {ref} from 'vue'
import { useRouter } from 'vue-router';

let $router =useRouter()

let keyword =ref<string>()

//搜索框下拉菜单展示的数据是根据value来的
const querySearch = async(queryString: string, cb: any) => {
  let result =  await reqHospitalKeyword(queryString)
  let showList =result.data.data.map((item:any) => {
      return {
        value:item.hosname,
        hoscode:item.hoscode
      }
    
  });

  cb(showList)
}


//点击搜索框下拉菜单然后路由跳转详情页
const handleSelect = (item: any) => {
  $router.push({path:'hosptial'})
}

</script>  

<style lang="scss" scoped>
  .search{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.el-input__wrapper){
      width: 600px;
      margin: 10px ;
    }
  }
</style>