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
              <el-input placeholder="请输入用户姓名"></el-input>
            </el-form-item>

            <el-form-item label="证件类型">
              <el-select placeholder="请输入证件类型" style="width: 100%">
                <el-option
                  v-for="item in certationArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="证件号码">
              <el-input placeholder="请输入证件号码"></el-input>
            </el-form-item>

            <el-form-item label="用户性别">
              <el-radio-group>
                <el-radio :label="1" size="large">男</el-radio>
                <el-radio :label="0" size="large">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期">
              <el-date-picker type="date" placeholder="请你选择日期" />
            </el-form-item>

            <el-form-item label="手机号码">
              <el-input placeholder="请输入用户手机号码"></el-input>
            </el-form-item>
          </el-form>

          <el-divider content-position="left"
            >建档信息(完善后部分医院首次就诊不排队建档)</el-divider
          >
          <el-form style="width: 60%; margin: 10px auto">
            <el-form-item label="婚姻状况">
              <el-radio-group>
                <el-radio :label="1" size="large">未婚</el-radio>
                <el-radio :label="0" size="large">已婚</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="自费/医保">
              <el-radio-group>
                <el-radio :label="1" size="large">自费</el-radio>
                <el-radio :label="0" size="large">医保</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="当前住址">
              <el-cascader :props="props" />
            </el-form-item>

            <el-form-item label="详细地址">
              <el-input placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-form>

          <el-divider content-position="left">联系人信息(选填)</el-divider>
          <el-form style="width: 60%; margin: 10px auto">
            <el-form-item label="用户姓名">
              <el-input placeholder="请输入用户姓名"></el-input>
            </el-form-item>

            <el-form-item label="证件类型">
              <el-select placeholder="请输入证件类型" style="width: 100%">
                <el-option
                  v-for="item in certationArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="证件号码">
              <el-input placeholder="请输入证件号码"></el-input>
            </el-form-item>

            <el-form-item label="手机号码">
              <el-input placeholder="请输入用户手机号码"></el-input>
            </el-form-item>

            <el-form-item label="" style="margin-left: 70px">
              <el-button type="primary">提交</el-button>
              <el-button>重写</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { selectData, reqCity } from "@/api/user/index";
import { User } from "@element-plus/icons-vue";
import { reqUserInFO } from "@/api/search/index";
import { onMounted, ref } from "vue";
let userArr = ref<any>([]);
let screne = ref<number>(0);
let certationArr = ref([]);
onMounted(() => {
  //获取就诊人信息
  getData();

  getSelectData();
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
};

//编辑就诊人信息
const changeScrene = () => {
  screne.value = 1;
  console.log(1);
};

//级联选择器
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    let result = await reqCity(node.data.id||"86");
    console.log(result);

    let showList = result.data.data.map((item) => {
      return {
         id:item.id,
        value: item.value,
        label: item.name,
        leaf:!item.hasChildren
      };
    });
    resolve(showList)
  },
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
