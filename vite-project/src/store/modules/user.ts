//pinia仓库写法:组合式API、选择式API
import { defineStore } from "pinia";
import { reqRcode } from "@/api/search";
const useUserStore =defineStore('User',{
 state:():any=>{
  return {
      dialogFlag:false,
      code:''
  }
 },
 actions:{
   async getRcode(phone:any){
        let result:any =await reqRcode(phone)
        if(result.status==200){
            this.code =result.data.data
        }
        
    }
 },
 getters:{

 }
});
//获取仓库的方法对外暴露
export default useUserStore;
 