///api/hosp/hospital/{hoscode}

import request from '@/utils/request';

enum API{
     //获取医院详情的接口
     HOSPTIALDDTAIL_URL='/hosp/hospital/',



}

//获取医院数据
export const reqHospitalDetail =(hoscode:string)=>request.get(API.HOSPTIALDDTAIL_URL+hoscode)
