///api/hosp/hospital/{hoscode}

import request from '@/utils/request';

enum API{
     //获取医院详情的接口
     HOSPTIALDDTAIL_URL='/hosp/hospital/',
     //获取科室数据
     HSOPTIALDEPARTMENT_URL='/hosp/hospital/department/',
     //获取验证码接口
     HPSPTIALRCODE_URL='/sms/send/',
     //获取登录接口
     USERLOGIN_URL='/user/login',
     //获取科室挂号信息
     HOSPTIALWORK_URL='/hosp/hospital/auth/getBookingScheduleRule/',
     //获取预约挂号医生信息
     HOSPTIALWORKERINFO_URL='/hosp/hospital/auth/findScheduleList/',
     //获取就诊人信息请求
     GETUSERINFO_URL='/user/patient/auth/findAll',
     //获取挂号医生的数据
     GETDOCTOR_URL='/hosp/hospital/getSchedule/'



}

//获取医院数据
export const reqHospitalDetail =(hoscode:string)=>request.get(API.HOSPTIALDDTAIL_URL+hoscode)

//获取科室数据
export const reqHospitalDepartment =(hoscode:string)=>request.get(API.HSOPTIALDEPARTMENT_URL+hoscode)

//获取验证码数据
export const reqRcode =(phone:string)=>request.get(API.HPSPTIALRCODE_URL+phone)

//用户登录接口
export const reqUserLogin =(data:any)=>request.post(API.USERLOGIN_URL,data)

//获取科室挂号信息
export const reqHosptialWork =(page:number,limit:number,hoscode:string,depcode:string)=>request.get(API.HOSPTIALWORK_URL+`${page}/${limit}/${hoscode}/${depcode}`)

//获取预约挂号医生信息
export const reqHosptialWorkInfo =(hoscode:string,depcode:string,workDate:string)=>request.get(API.HOSPTIALWORKERINFO_URL+`${hoscode}/${depcode}/${workDate}`)


//获取就诊人信息接口
export const reqUserInFO =()=>request.get(API.GETUSERINFO_URL)

 //获取挂号医生的数据
 export const reqDoctor =(scheduleId:string)=>request.get(API.GETDOCTOR_URL+`${scheduleId}`)