import request from '@/utils/request';

enum API{
     //获取已有的已有的接口数据
     HOSPTIAL_URL='/hosp/hospital/',
     //获取医院等级和地区的接口
     HOSPTIALLEVELANDREGION='/cmn/dict/findByDictCode/',
     //根据医院关键字搜索
     HOSPTIAL_KEYWORD='/hosp/hospital/findByHosname/'


}

//获取医院数据
export const reqHospital =(pageNo:number,limit:number,hostype:'',districtCode:'')=>request.get(API.HOSPTIAL_URL+`${pageNo}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)

//获取医院的等级或者医院地区的数据
export const reqHospitalLevelAndRegion =(dictCode:string)=>request.get(API.HOSPTIALLEVELANDREGION+`${dictCode}`)

//根据医院关键字搜索
export const reqHospitalKeyword =(keyword:string)=>request.get(API.HOSPTIAL_KEYWORD+keyword)

