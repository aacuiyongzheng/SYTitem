<template>
   
<Detail v-if="$route.query.orderId" />

 <AllOrder v-else />
</template>

<script setup lang="ts">
import AllOrder from '@/pages/user/order/allOrder/index.vue'
import Detail from '@/pages/user/order/detail/index.vue'
import {useRoute} from 'vue-router'
let $route =useRoute()

</script>

<style lang="scss" scoped>

</style>