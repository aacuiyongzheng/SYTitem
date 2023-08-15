<template>
 
    <span>获取验证码({{ time }}s)</span>
    
</template>

<script setup lang="ts">
import {watch,ref} from 'vue'

let time =ref<number>(5)
let props =defineProps(['isShow'])
let $emit =defineEmits(['getFlag'])
watch(()=>props.isShow,()=>{
    immediate:true
   let timer =setInterval(()=>{
        time.value--
        if(time.value ==0){
            $emit('getFlag',true)
            clearInterval(timer)
          
        }
   },1000)
},{
    immediate:true
})
</script>

<style lang="scss" scoped>

</style>