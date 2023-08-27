<template>
  <div class="container">
    <div class="card">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>就诊人管理</span>
            <el-button
              class="button"
              type="primary"
              :icon="User"
              @click="addUserInfo"
              >添加就诊人信息</el-button
            >
          </div>
        </template>

        <div class="visitor" v-if="screne == 0">
          <visitor
            @changeScrene="changeScrene"
            @removeScrene="removeScrene"
            v-for="(item, index) in userArr"
            :key="item.id"
            class="item"
            :user="item"
            :index="index"
          ></visitor>
        </div>

        <div class="form" v-if="screne == 1">
          <el-divider content-position="left">就诊人信息</el-divider>
          <el-form style="width: 60%; margin: 10px auto">
            <el-form-item label="用户姓名">
              <el-input
                placeholder="请输入用户姓名"
                v-model="userParams.name"
              ></el-input>
            </el-form-item>

            <el-form-item label="证件类型">
              <el-select
                placeholder="请输入证件类型"
                style="width: 100%"
                v-model="userParams.certificatesType"
              >
                <el-option
                  v-for="item in certationArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="证件号码">
              <el-input
                placeholder="请输入证件号码"
                v-model="userParams.certificatesNo"
              ></el-input>
            </el-form-item>

            <el-form-item label="用户性别">
              <el-radio-group v-model="userParams.sex">
                <el-radio :label="1" size="large">男</el-radio>
                <el-radio :label="0" size="large">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期">
              <el-date-picker
                type="date"
                placeholder="请你选择日期"
                v-model="userParams.birthdate"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>

            <el-form-item label="手机号码">
              <el-input
                placeholder="请输入用户手机号码"
                v-model="userParams.phone"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-divider content-position="left"
            >建档信息(完善后部分医院首次就诊不排队建档)</el-divider
          >
          <el-form style="width: 60%; margin: 10px auto">
            <el-form-item label="婚姻状况">
              <el-radio-group v-model="userParams.isMarry">
                <el-radio :label="1" size="large">未婚</el-radio>
                <el-radio :label="0" size="large">已婚</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="自费/医保">
              <el-radio-group v-model="userParams.isInsure">
                <el-radio :label="1" size="large">自费</el-radio>
                <el-radio :label="0" size="large">医保</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="当前住址">
              <el-cascader
                :props="props"
                v-model="userParams.addressSelected"
              />
            </el-form-item>

            <el-form-item label="详细地址">
              <el-input
                placeholder="请输入地址"
                v-model="userParams.address"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-divider content-position="left">联系人信息(选填)</el-divider>
          <el-form style="width: 60%; margin: 10px auto">
            <el-form-item label="用户姓名">
              <el-input
                placeholder="请输入用户姓名"
                v-model="userParams.contactsName"
              ></el-input>
            </el-form-item>

            <el-form-item label="证件类型">
              <el-select
                placeholder="请输入证件类型"
                style="width: 100%"
                v-model="userParams.contactsCertificatesType"
              >
                <el-option
                  v-for="item in certationArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="证件号码">
              <el-input
                placeholder="请输入证件号码"
                v-model="userParams.contactsCertificatesNo"
              ></el-input>
            </el-form-item>

            <el-form-item label="手机号码">
              <el-input
                placeholder="请输入用户手机号码"
                v-model="userParams.contactsPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="" style="margin-left: 70px">
              <el-button type="primary" @click="submit">提交</el-button>
              <el-button @click="reset">重写</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { selectData, reqCity, reqAddOrUpdate } from "@/api/user/index";
import { User } from "@element-plus/icons-vue";
import { reqUserInFO } from "@/api/search/index";
import { onMounted, ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
let userArr = ref<any>([]);
let $router = useRouter();
let $route = useRoute();
let screne = ref<number>(0);
let certationArr = ref([]);
//收集新增就诊人的数据
let userParams = reactive({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
});
onMounted(() => {
  //获取就诊人信息
  getData();

  getSelectData();

  if ($route.query.type == "add") {
    screne.value = 1;
  }
});

//获取就诊人信息
const getData = async () => {
  let result = await reqUserInFO();
  if (result.status == 200) {
    userArr.value = result.data.data;
  }
};

//获取证件类型
const getSelectData = async () => {
  let result = await selectData();
  if (result.status == 200) {
    certationArr.value = result.data.data;
  }
};

//添加就诊人信息
const addUserInfo = () => {
  screne.value = 1;
  Object.assign(userParams, {
    id: null,
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  });
};

//编辑就诊人信息
const changeScrene = (data: any) => {
  screne.value = 1;
  userParams = data;
};

//级联选择器
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    let result = await reqCity(node.data.id || "86");
    console.log(result);

    let showList = result.data.data.map((item) => {
      return {
        id: item.id,
        value: item.value,
        label: item.name,
        leaf: !item.hasChildren,
      };
    });
    resolve(showList);
  },
};

//提交按钮
const submit = async () => {
  try {
    await reqAddOrUpdate(userParams);
    ElMessage({
      type: "success",
      message: "提交成功",
    });

    if ($route.query.type) {
      $router.back();
    } else {
      screne.value = 0;
    }
    getData();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "提交失败",
    });
  }
};

//重写按钮
const reset = () => {
  Object.assign(userParams, {
    id: null,
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  });
};

//监听数据变化
watch(
  () => userArr.value,
  () => {
    if ($route.query.type == "update") {
      screne.value = 1;

      let user = userArr.value.find((item) => {
        return item.id == $route.query.id;
      });

      Object.assign(userParams, user);
    }
  }
);

//子组件删除之后,父组件刷新数据
const removeScrene = () => {
  getData();
};
</script>

<style lang="scss" scoped>
.container {
  .card {
    margin: 55px 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .visitor {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }
}
</style>
