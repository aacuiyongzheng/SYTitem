//本地存储用户信息的方法

export const SET_TOKEN =(userInfo:string)=>{
localStorage.setItem('USERINFO',userInfo)
}

export const GET_TOKEN =()=>{
return  localStorage.getItem('USERINFO')
 }
 
 export const REOOVE_TOKEN =()=>{
  localStorage.removeItem('USERINFO')
   }

