<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <span>{{ user.isInsure == 1 ? "医保" : "自费" }}</span>
        <p>{{ user.name }}</p>
      </div>
      <div class="right">
        <el-button
          type="primary"
          circle
          :icon="Edit"
          @click="Editt"
        ></el-button>
        <el-popconfirm
          :title="`确定删除${props.user.name}吗`"
          width="170px"
          @confirm="Deletee"
        >
          <template #reference>
            <el-button
              v-if="$route.path == '/user/patient'"
              type="danger"
              circle
              :icon="Delete"
            ></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型:{{ user.param.cerficatesTypeString }}</p>
      <p>证件号码:{{ user.param.cerficatesNo }}</p>
      <p>证件性别:{{ user.sex == 0 ? "女生" : "男生" }}</p>
      <p>出生日期:{{ user.birthdate }}</p>
      <p>收集号码:{{ user.phone }}</p>
      <p>婚姻状况{{ user.isMarry == 0 ? "未婚" : "已婚" }}</p>
      <p>当前住址:{{ user.param.cityString }}</p>
      <p>祥地地址:{{ user.param.fullAddress }}</p>

      <transition name="confirm">
        <div class="confirm" v-if="index == currentIndex">已选择</div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { reqRemoveUser } from "@/api/user/index";
import { ElMessage } from "element-plus";
let props = defineProps(["user", "currentIndex", "index"]);
let $emit = defineEmits(["changeScrene",'removeScrene']);
let $route = useRoute();
let $router = useRouter();

const Editt = () => {
  if ($route.path == "/user/patient") {
    $emit("changeScrene", props.user);
  } else {
    $router.push({
      path: "/user/patient",
      query: { type: "update", id: props.user.id },
    });
  }
};

const Deletee = async () => {
  try {
    await reqRemoveUser(props.user.id);
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    $emit('removeScrene')
  } catch (error) {}
};
</script>

<style lang="scss" scoped>
.container {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  .top {
    height: 60px;
    background-color: #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      margin-left: 20px;
      display: flex;
      span {
        margin: 0 10px;
        background-color: white;
        padding: 4px;
        font-size: 12px;
        border-radius: 10px;
      }

      p {
        color: #7f7f7f;
        margin-top: 4px;
      }
    }

    .right {
      margin-right: 20px;
    }
  }

  .bottom {
    padding: 10px;
    position: relative;
    p {
      line-height: 30px;
    }

    .confirm {
      position: absolute;
      width: 200px;
      height: 200px;
      border: 1px dashed red;
      border-radius: 50%;
      text-align: center;
      line-height: 200px;
      left: 20%;
      top: 20%;
      opacity: 0.5;
      transform: rotate(35deg);
      font-weight: 900;
    }

    .confirm-enter-from {
      transform: scale(1);
    }

    .confirm-enter-active {
      transition: all 0.3s;
    }

    .confirm-enter-to {
      transform: scale(1.2);
    }
  }
}
</style>
