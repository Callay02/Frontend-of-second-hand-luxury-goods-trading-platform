<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-09 00:34:30
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-15 13:11:47
 * @FilePath: \vue\src\views\regularusers\OrderFormView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-container>
        <el-header><el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="0">待发货</el-menu-item>
                <el-menu-item index="1">已发货</el-menu-item>
                <el-menu-item index="2">已签收</el-menu-item>
                <el-menu-item index="3">售后</el-menu-item>
            </el-menu></el-header>
        <el-main><router-view /></el-main>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            activeIndex:"0"
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key,keyPath)
            if(keyPath[0]==0){
                this.$router.push('/index/orderForm/toBeShipped')
            }
            else if(keyPath[0]==1){
                this.$router.push('/index/orderForm/shipped')
            }
            else if(keyPath[0]==2){
                this.$router.push('/index/orderForm/Signed')
            }
            else if(keyPath[0]==3){
                this.$router.push('/index/orderForm/signed')
            }
        }
    }

}
</script>

<style scoped></style>