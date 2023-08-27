<template>
      <div class="constainer">
         <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
   
      <div class="content">
        <div class="top">
          <svg t="1692439156058" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4036" width="15" height="15"><path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM490.666667 448.149333c0-11.861333 9.472-21.482667 21.333333-21.482666 11.776 0 21.333333 9.6 21.333333 21.482666v255.701334C533.333333 715.733333 523.861333 725.333333 512 725.333333c-11.776 0-21.333333-9.6-21.333333-21.482666V448.149333z m0-127.957333a21.333333 21.333333 0 1 1 42.666666 0v42.282667a21.333333 21.333333 0 1 1-42.666666 0v-42.282667z" fill="#3D3D3D" p-id="4037"></path></svg>          
          <span>完成实名认证后才能添加就诊人,正常进行挂号,为了不影响后续步骤,建议提前实名认证.</span>
        </div>
        <div class="bottom">

          <!-- 用户验证后 -->
          <el-descriptions
          v-if="userInfo.authStatus==1"
    class="margin-top"
    :column="1"
    border


  >

    <el-descriptions-item :width="20" label-align="center">
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          用户姓名:
        </div>
      </template>
      {{ userInfo.name }}
    </el-descriptions-item>

    <el-descriptions-item :width="20" label-align="center">
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          证件类型:
        </div>
      </template>
      {{ userInfo.certificatesType==10?'身份证':'户口本' }}
    </el-descriptions-item>
    
    <el-descriptions-item :width="20" label-align="center">
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          证件号码
        </div>
      </template>
      {{userInfo.certificatesNo}}
    </el-descriptions-item>

  </el-descriptions>

          <!-- 用户未验证 -->
            <el-form v-else style="width: 60%; margin: 20px auto;" label-width="80"
            :rules="rules" 
            :model="params"
            ref="ruleFormRef"
            >
              <el-form-item label="用户姓名" prop="name">
                <el-input  placeholder="请输入用户姓名" v-model="params.name"></el-input>
              </el-form-item>

              <el-form-item label="证件类型" prop="certificatesType">
                <el-select style="width: 100%;"  placeholder="请输入证件类型" v-model="params.certificatesType">
                  <el-option :label="item.name" :value="item.value" v-for="(item,index) in selectArr" :key="index"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="证件号码" prop="certificatesNo">
                <el-input  placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
              </el-form-item>

              <el-form-item label="上传证件" prop="certificatesUrl" >
                <el-upload
                ref="upload"
                :on-success="success"
                list-type="picture-card"
                action="/api/oss/file/fileUpload?fileHost=userAuah"
                :limit="1"
                :on-exceed="limitt"
                :on-preview="handlePictureCardPreview"
                 :on-remove="handleRemove"
                >
                    <img style="width: 100%;height: 100%;" src="../../../assets//images/auth_example.png" alt="">
                </el-upload>

                  <el-dialog v-model="dialogVisible">
                   <img w-full v-if="params.certificatesUrl"  style="width: 100%;height: 100%;" :src="params.certificatesUrl"   alt="Preview Image" />
                 </el-dialog>
              </el-form-item>

              <el-form-item  >
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="" @click="reset">重写</el-button>
              </el-form-item>
            </el-form>

        </div>
      </div>

  </el-card>
      </div>
</template>

<script setup lang="ts">
import {reqUserInfo,selectData,UserConfirm} from '@/api/user/index'
import { ElMessage } from 'element-plus';
import { onMounted,ref,reactive } from 'vue';

let upload=ref()
let userInfo=ref<any>({})
let selectArr=ref<any>([])
let params =reactive<any>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: ""
})
let dialogVisible = ref<boolean>(false)
let ruleFormRef=ref()

onMounted(()=>{
    getUserInfo()
    getSelectData()
})

//获取实名认证信息
const getUserInfo=async()=>{
    let result:any =await reqUserInfo()
    if(result.status==200){
      userInfo.value=result.data.data
    }
    
}

//获取下拉框数据
const getSelectData= async()=>{
    let result =await selectData()
    if(result.status==200){
      selectArr.value=result.data.data
    }
}

//图片上传之后的钩子
const success=(response: any)=>{
  ruleFormRef.value.clearValidate('certificatesUrl')
  params.certificatesUrl=response.data
}

//限制上传一张图片
const limitt=()=>{
  ElMessage({
    type:'error',
    message:'限上传一张图片'
  })
}

//删除图片
const handleRemove:any= () => {
params.certificatesUrl=''
}

//预览图片
const handlePictureCardPreview:any = (uploadFile:any) => {
  params.certificatesUrl = uploadFile.url!
  dialogVisible.value = true
}

//重写按钮
const reset=()=>{

  upload.value.clearFiles()

  Object.assign(params,{
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: ""
})


}

//提交按钮
const submit=async()=>{
      await ruleFormRef.value.validate()
    try {
      await UserConfirm(params)
      
      ElMessage({
        type:'success',
        message:'认证成功'
      })

      getUserInfo()
    } catch (error) {
      
    }

   
}

//用户名校验规则
const validateName=(rule: any, value: any, callback: any)=>{
  let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
  if(reg.test(value)){
    callback()
  }else{
    callback(new Error('请输入正确的用户名'))
  }
}

//用户身份证号校验
const validateType=(rule: any, value: any, callback: any)=>{
  if(value=='10'||value=='20'){
      callback()
  }else
  {
    callback(new Error('请选择证件类型'))
  }
}

//用户身份类型规则校验
const validateNo=(rule: any, value: any, callback: any)=>{
  let reg15 = /^[1-9]\d{5}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/;
  let reg = /^[a-zA-Z0-9]{3,21}$/; 
  if(reg15.test(value)||reg.test(value)){
    callback()
  }else{
    callback(new Error('请选择正确的身份证或者户口本的号码'))
  }
}

//用户上传图片表单验证规则
const validateUrl=(rule: any, value: any, callback: any)=>{
  if(value.length){
    callback()
  }else{
    callback(new Error('请上传图片'))
  }
}

//表单校验规则
const rules = {
  name: [{ validator: validateName, trigger: 'change',required: true  }],
  certificatesNo: [{ validator: validateNo,required: true }],
  certificatesType: [{ validator: validateType,required: true  }],
  certificatesUrl: [{ validator: validateUrl,required: true  }],
}

</script>

<style lang="scss" scoped>
.constainer{
  margin-top: 50px;
  margin-left: 20px;

  .top{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7f7f7f;
  }

  .bottom{
    margin-top: 20px;
  }

  
  
}
</style>