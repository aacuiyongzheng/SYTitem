//pinia仓库写法:组合式API、选择式API
import { defineStore } from "pinia";
import { reqHospitalDetail,reqHospitalDepartment } from "@/api/search";
const useDetailStore =defineStore('Detail',{
 state:():any=>{
  return {
        //医院详细信息
        hosptialInfo:{},
        hosptialDepartmentInfo:{}
  }
 },
 actions:{
  //获取医院详情数据 
 async getHosptial(hoscode:string){
     let result:any =await reqHospitalDetail(hoscode)
     if(result.status==200){
       this.hosptialInfo=result.data.data

     }
     
  },
  //获取科室数据
  async getHosptialDepartment(hoscode:string){
    let result:any =await reqHospitalDepartment(hoscode)
    if(result.status==200){
      console.log(result);
      
      this.hosptialDepartmentInfo=result.data.data

    }
    
 }
 },
 getters:{

 }
});
//获取仓库的方法对外暴露
export default useDetailStore
 