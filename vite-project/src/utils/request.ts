import axios from "axios";
import { ElMessage } from "element-plus";

const  request =axios.create({
 baseURL:'/api',   //基础路径 根据服务器请求接口判断,是否带用
 timeout:5000  //超时时间的设置,超出五秒就是失败
})

//请求拦截器
request.interceptors.request.use((config)=>{

 //config:请求拦截器回调注入的对象(配置对象),配置对象上最重要的一件事是headers属性
 //可以通过请求头携带公共参数
 return config;
})

request.interceptors.response.use((response)=>{


    //响应拦截器成功的回调,一般会进行简化数据
 return response;
},(error)=>{
  //处理http网络错误
  let status =error.response.status;
  switch (status) {
   case 404:
    //提示错误信息
    ElMessage({
     type:'error',
     message:'服务器失败路径出现问题'
    })
    break;
  case 500|501|502:
   ElMessage({
    type:'error',
    message:'服务器挂了'
   })
   break;
   default:
    break;
  }
  Promise.reject(new Error(error.message))
})

export default request