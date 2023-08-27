<template>


    <div class="container">
      <div class="top">
        <span>{{ workData.baseMap?.hosname}} |</span>
        <span>{{ workData.baseMap?.bigname}} .</span>
        <span>{{ workData.baseMap?.depname}}</span>
      </div>
      <div class="content">
        <div class="time">
              {{ workData.baseMap?.workDateString }}
        </div>

        <div class="bottom" >
            <div class="box"  @click="changeScrene(item)" :class="{active:item.status==-1||item.availableNumber==1,cur:item.workDate==workTime.workDate}"  v-for="item in workData.bookingScheduleList" :key="item.docCount"> 
              <div class="t">
                {{ item.workDate }}  {{ item.dayOfWeek }}
              </div>
              <div class="b">
                <div v-if="item.status==-1">停止挂号</div>
                <div v-if="item.status==0">
                  {{ item.availableNumber==-1?'约满了':`有号(${item.availableNumber})` }}
                </div>
                <div v-if="item.status==1">即将放号</div>
              </div>
            </div>
        </div>
        <!-- :current-page="page" :page-size="limit" -->
        <el-pagination  v-model:current-page="pageNo" v-model:page-size="limit" layout="prev, pager, next" :total="50" @current-change="fetchWorkData()" />
      </div>

      
    </div>

    <div v-if="workTime?.status==1">
            <div class="TT">{{workTime.workDate}}</div>
            <div class="PP">放号</div>
    </div>

    <div class="due" v-else>
          <div class="apm" >
            <div class="title">
              <svg t="1692320872295" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4204" width="32" height="32"><path d="M304.5 691.8c0-145.3 117.8-263 263-263s263 117.8 263 263" fill="#d81e06" p-id="4205"></path><path d="M567.5 428.8c-16.7 0-32.9 1.7-48.7 4.7 122 22.9 214.3 129.7 214.3 258.3h97.4c0.1-145.2-117.7-263-263-263z" fill="#d81e06" p-id="4206"></path><path d="M772.1 687.3c-8.3 0-15-6.7-15-15 0-66.2-25.8-128.5-72.6-175.4-46.8-46.8-109.1-72.6-175.4-72.6-66.2 0-128.5 25.8-175.4 72.6-46.8 46.8-72.6 109.1-72.6 175.4 0 8.3-6.7 15-15 15s-15-6.7-15-15c0-74.3 28.9-144.1 81.4-196.6 52.5-52.5 122.3-81.4 196.6-81.4s144.1 28.9 196.6 81.4c52.5 52.5 81.4 122.3 81.4 196.6 0 8.3-6.7 15-15 15z" fill="#d81e06" p-id="4207"></path><path d="M914.1 704.5H120c-8.3 0-15-6.7-15-15s6.7-15 15-15h794.1c8.3 0 15 6.7 15 15s-6.7 15-15 15zM755.2 777.4H278.8c-8.3 0-15-6.7-15-15s6.7-15 15-15h476.5c8.3 0 15 6.7 15 15s-6.8 15-15.1 15zM605.6 858.1H428.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h177.1c8.3 0 15 6.7 15 15s-6.8 15-15 15zM179.4 641h-63.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h63.5c8.3 0 15 6.7 15 15s-6.7 15-15 15zM515.9 323.4c-8.3 0-15-6.7-15-15V181.3c0-8.3 6.7-15 15-15s15 6.7 15 15v127.1c0 8.3-6.7 15-15 15zM271 422.9c-3.8 0-7.7-1.5-10.6-4.4l-56.2-56.2c-5.9-5.9-5.9-15.4 0-21.2 5.9-5.9 15.4-5.9 21.2 0l56.2 56.2c5.9 5.9 5.9 15.4 0 21.2-2.9 3-6.8 4.4-10.6 4.4zM754.8 422.9c-3.8 0-7.7-1.5-10.6-4.4-5.9-5.9-5.9-15.4 0-21.2l56.2-56.2c5.9-5.9 15.4-5.9 21.2 0 5.9 5.9 5.9 15.4 0 21.2l-56.2 56.2c-2.9 3-6.7 4.4-10.6 4.4z" fill="#d81e06" p-id="4208"></path><path d="M441.2 544.2a18.8 17.8 0 1 0 37.6 0 18.8 17.8 0 1 0-37.6 0Z" fill="#d81e06" p-id="4209"></path><path d="M553.9 544.2a18.8 17.8 0 1 0 37.6 0 18.8 17.8 0 1 0-37.6 0Z" fill="#d81e06" p-id="4210"></path><path d="M491.3 577.5c0 13.1 11.2 23.7 25 23.7s25-10.6 25-23.7h-50z" fill="#d81e06" p-id="4211"></path><path d="M406.9 588.6a21.9 20.7 0 1 0 43.8 0 21.9 20.7 0 1 0-43.8 0Z" fill="#d81e06" p-id="4212"></path><path d="M582.1 588.6a21.9 20.7 0 1 0 43.8 0 21.9 20.7 0 1 0-43.8 0Z" fill="#d81e06" p-id="4213"></path></svg>
              <span>上午号源</span>
            </div>
            
            <div class="content"  v-for="item in AArr" :key="item.id">
              <div class="left">
                <span>{{item.title}} | {{item.docname}}</span>
                <p>{{item.skill}}</p>
              </div>
              <div class="right">
                <p>${{item.amount}}</p>
                <el-button type="primary" size="big" @click="goStep2(item)" >剩余{{item.availableNumber}}</el-button>
              </div>
            </div>
          </div>
          <div class="npm">
             <div class="apm" >
              <div class="title">
              <svg t="1692320872295" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4204" width="32" height="32"><path d="M304.5 691.8c0-145.3 117.8-263 263-263s263 117.8 263 263" fill="#d81e06" p-id="4205"></path><path d="M567.5 428.8c-16.7 0-32.9 1.7-48.7 4.7 122 22.9 214.3 129.7 214.3 258.3h97.4c0.1-145.2-117.7-263-263-263z" fill="#d81e06" p-id="4206"></path><path d="M772.1 687.3c-8.3 0-15-6.7-15-15 0-66.2-25.8-128.5-72.6-175.4-46.8-46.8-109.1-72.6-175.4-72.6-66.2 0-128.5 25.8-175.4 72.6-46.8 46.8-72.6 109.1-72.6 175.4 0 8.3-6.7 15-15 15s-15-6.7-15-15c0-74.3 28.9-144.1 81.4-196.6 52.5-52.5 122.3-81.4 196.6-81.4s144.1 28.9 196.6 81.4c52.5 52.5 81.4 122.3 81.4 196.6 0 8.3-6.7 15-15 15z" fill="#d81e06" p-id="4207"></path><path d="M914.1 704.5H120c-8.3 0-15-6.7-15-15s6.7-15 15-15h794.1c8.3 0 15 6.7 15 15s-6.7 15-15 15zM755.2 777.4H278.8c-8.3 0-15-6.7-15-15s6.7-15 15-15h476.5c8.3 0 15 6.7 15 15s-6.8 15-15.1 15zM605.6 858.1H428.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h177.1c8.3 0 15 6.7 15 15s-6.8 15-15 15zM179.4 641h-63.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h63.5c8.3 0 15 6.7 15 15s-6.7 15-15 15zM515.9 323.4c-8.3 0-15-6.7-15-15V181.3c0-8.3 6.7-15 15-15s15 6.7 15 15v127.1c0 8.3-6.7 15-15 15zM271 422.9c-3.8 0-7.7-1.5-10.6-4.4l-56.2-56.2c-5.9-5.9-5.9-15.4 0-21.2 5.9-5.9 15.4-5.9 21.2 0l56.2 56.2c5.9 5.9 5.9 15.4 0 21.2-2.9 3-6.8 4.4-10.6 4.4zM754.8 422.9c-3.8 0-7.7-1.5-10.6-4.4-5.9-5.9-5.9-15.4 0-21.2l56.2-56.2c5.9-5.9 15.4-5.9 21.2 0 5.9 5.9 5.9 15.4 0 21.2l-56.2 56.2c-2.9 3-6.7 4.4-10.6 4.4z" fill="#d81e06" p-id="4208"></path><path d="M441.2 544.2a18.8 17.8 0 1 0 37.6 0 18.8 17.8 0 1 0-37.6 0Z" fill="#d81e06" p-id="4209"></path><path d="M553.9 544.2a18.8 17.8 0 1 0 37.6 0 18.8 17.8 0 1 0-37.6 0Z" fill="#d81e06" p-id="4210"></path><path d="M491.3 577.5c0 13.1 11.2 23.7 25 23.7s25-10.6 25-23.7h-50z" fill="#d81e06" p-id="4211"></path><path d="M406.9 588.6a21.9 20.7 0 1 0 43.8 0 21.9 20.7 0 1 0-43.8 0Z" fill="#d81e06" p-id="4212"></path><path d="M582.1 588.6a21.9 20.7 0 1 0 43.8 0 21.9 20.7 0 1 0-43.8 0Z" fill="#d81e06" p-id="4213"></path></svg>
              <span>下午号源</span>
            </div>
            
            <div class="content"  v-for="item in PArr" :key="item.id">
              <div class="left">
                <span>{{item.title}} | {{item.docname}}</span>
                <p>{{item.skill}}</p>
              </div>
              <div class="right">
                <p>${{item.amount}}</p>
                <el-button type="primary" size="big" @click="goStep2(item)">剩余{{item.availableNumber}}</el-button>
              </div>
            </div>
          </div>
          
          </div>
    </div>

</template>

<script setup lang="ts">
import { reqHosptialWork,reqHosptialWorkInfo} from "@/api/search";
import useUserStore from '@/store/modules/user.ts'
import { onMounted,ref,computed} from 'vue';
import { useRoute,useRouter } from 'vue-router';
let $route =useRoute()
let $router =useRouter()
let userStore=useUserStore()
let pageNo=ref<number>(1)
let limit=ref<number>(6)
let workData=ref<any>({})
let workerData=ref<any>([])
let workTime=ref<any>()
onMounted(()=>{
  fetchWorkData()
  
})

//获取预约数据
const fetchWorkData=async()=>{
  let result:any =await reqHosptialWork(pageNo.value,limit.value,($route.query.hoscode as string),($route.query.depcode as string))
     if(result.status==200){
      workData.value=result.data.data
      workTime.value=result.data.data.bookingScheduleList[0]
      getData()
     }
}

//获取上下午数据
const getData=async()=>{
    let hoscode:any =$route.query.hoscode
    let depcode:any =$route.query.depcode
    let time:any =workTime.value.workDate
  let result =await reqHosptialWorkInfo(hoscode,depcode,time)
  if(result.status==200){
    workerData.value=result.data.data
  }
  
}

//计算下午数据
let AArr = computed(()=>{
    return workerData.value.filter((item:any)=>{
        return  item.workTime==0

    })
})

//计算下午数据
let PArr = computed(()=>{
    return workerData.value.filter((item:any)=>{
        return  item.workTime==1

    })
})

//点击某一天,切换不同数据
const changeScrene=(item:any)=>{
  workTime.value=item
    getData()

    
}

//去setp2
const goStep2=(item:any)=>{
  $router.push({path:'/hosptial/register_step2',query:{docId:item.id}})

}


</script>

<style lang="scss" scoped>
.container{
  margin-top: 57px;
  .top{
    span{
      
      margin-left: 10px;
      color: #7f7f7f;
    }
  }

  .content{
    .time{
      margin-top: 56px;
      margin-left: 400px;
      color: #7f7f7f;
      font-size: 14px;
    }

    :deep(.el-pagination){
      margin-left: 300px;
      margin-top: 20px;
    }
  }

  .bottom{
    display: flex;
    margin-top: 20px;

    .box{
      width:130px;
      margin: 0 10px;
      border: 1px solid skyblue;
      transition: all 0.5s;

      &.cur{
        transform: scale(1.1);
      }
      &.active{
        border: 1px solid #ccc;
        .t{
          height: 40px;
        line-height: 40px;
        background-color: #ccc;
        text-align: center;
        }
      }
      .t{
        height: 40px;
        line-height: 40px;
        background-color: skyblue;
        text-align: center;
      }

      .b{
        height: 50px;
        line-height: 50px;
        margin-left: 40px;

      }
    }
  }
}

.due{
  margin-left: 20px;
  .apm{

    
    .title{
      font-size: 14px;
      color: #7f7f7f;
      font-weight: 900;
    }

    .content{
              display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #7f7f7f;
      .left{
        span{
          display: block;
          color: skyblue;
          font-size: 14px;
          margin: 10px 0;
        }
        p{
          margin-bottom: 10px;
        }
      }

      .right{
        display: flex;
        align-items: center;
        p{
          margin-right: 30px;
        }
      }
    }
  }

  .npm{
    margin-top: 20px;
  }
}

.timm{
  margin: 30px 300px;
  .TT{
    font-size: 25px;
    color: red;
  }

  .PP{
    font-size: 25px;
    color: skyblue;
  }
}
</style>