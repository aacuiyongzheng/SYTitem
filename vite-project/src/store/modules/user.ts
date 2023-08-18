//pinia仓库写法:组合式API、选择式API
import { defineStore } from "pinia";
import { reqRcode,reqUserLogin} from "@/api/search";
import {SET_TOKEN,GET_TOKEN,REOOVE_TOKEN} from '@/utils/localstorge'
import { ElMessage } from 'element-plus'
import { log } from "console";
const useUserStore =defineStore('User',{
 state:():any=>{
  return {
      dialogFlag:false,
      code:'',
      userInfo:JSON.parse(GET_TOKEN() as string) || {}
  }
 },
 actions:{
    //获取验证码
   async getRcode(phone:any){
        let result:any =await reqRcode(phone)
        if(result.status==200){     
            this.code =result.data.data
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
        
    },
    //登录接口
   async userLogin(data:any){
   let result = await reqUserLogin(data)
        if(result.status==200){
            
            this.userInfo=result.data.data
            SET_TOKEN(JSON.stringify(this.userInfo))

            ElMessage({
                type:'success',
                message:'登录成功'
            })
        }else{
            return Promise.reject(new Error(result.message))
        }
        
    },
    //退出登录
    logOut(){
        this.userInfo={name:'',token:''}
        REOOVE_TOKEN()
        
    },


 },
 getters:{

 }
});
//获取仓库的方法对外暴露
export default useUserStore;
 