import request from '@/utils/request';

enum API{
    //提交订单,获取订单号接口
    SUBMITORDER_URL='/order/orderInfo/auth/submitOrder/',
    //获取订单详情的数据  
    GETORDERINFO='/order/orderInfo/auth/getOrderInfo/',
    //取消预约
    CANCELORDER='/order/orderInfo/auth/cancelOrder/',
    //微信二维码地址
    GETWEXIN='/order/weixin/createNative/',
    //二维码订单查询
    ISPAY='/order/weixin/queryPayStatus/',
    //实名认证信息
    USERINFO='/user/auth/getUserInfo',
    //下拉框选项
    SELECTDATA='/cmn/dict/findByDictCode/',
    //用户认证
    USERCONFIRM='/user/auth/userAuah',
    //获取用户订单号的数据
    USERORDERINFO='/order/orderInfo/auth/',
    //级联选择器
    CITY_URL='/cmn/dict/findByParentId/',
    //新增就诊人
    ADD_USER='/user/patient/auth/save',
    //修改就诊人
    UPDATE_USER='/user/patient/auth/update'
    



}

//提交订单,获取订单号接口
export const reqSubmitOrder =(hoscode:string,scheduleId:string,patientId:string)=>request.post(API. SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)

//获取订单详情的数据 
export const reqOrderInfo =(id:string)=>request.get(API.GETORDERINFO+`${id}`)

//取消预约
export const reqCancelOrder =(id:string)=>request.get(API.CANCELORDER+`${id}`)

//微信二维码地址
export const reqWeixin =(orderId:string)=>request.get(API.GETWEXIN+`${orderId}`)

//二维码是否支付
export const isPay =(orderId:string)=>request.get(API.ISPAY+`${orderId}`)

//实名认证信息
export const reqUserInfo =()=>request.get(API.USERINFO)

//下拉框数据
export const selectData =(dictCode='certificatesType')=>request.get(API.SELECTDATA+`${dictCode}`)

//用户认证
export const UserConfirm =(data:any)=>request.post(API.USERCONFIRM,data)

//获取用户订单数据
export const reqUserOrderInfo = (page: number, limit: number) => request.get(API.USERORDERINFO + `${page}/${limit}`)

//获取城市的数据
export const reqCity=(parentId:string)=>request.get(API.CITY_URL+`${parentId}`)

//新增或修改就诊人信息
export const reqAddOrUpdate=(data)=>{
    if(data.id){
        return request.put(API.UPDATE_USER,data)
    }else{
        return request.post(API.ADD_USER,data)
    }
}