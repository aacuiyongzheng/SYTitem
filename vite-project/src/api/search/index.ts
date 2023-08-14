///api/hosp/hospital/{hoscode}

import request from '@/utils/request';

enum API{
     //获取医院详情的接口
     HOSPTIALDDTAIL_URL='/hosp/hospital/',
     //获取科室数据
     HSOPTIALDEPARTMENT_URL='/hosp/hospital/department/',
     //获取验证码接口
     HPSPTIALRCODE_URL='/sms/send/'



}

//获取医院数据
export const reqHospitalDetail =(hoscode:string)=>request.get(API.HOSPTIALDDTAIL_URL+hoscode)

//获取科室数据
export const reqHospitalDepartment =(hoscode:string)=>request.get(API.HSOPTIALDEPARTMENT_URL+hoscode)

//获取验证码数据
export const reqRcode =(phone:string)=>request.get(API.HPSPTIALRCODE_URL+phone)
