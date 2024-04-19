<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-09 00:34:30
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-20 05:01:05
 * @FilePath: \vue\src\views\regularusers\OrderFormView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-container>
        <el-header>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="待发货" name="toBeShipped"></el-tab-pane>
                <el-tab-pane label="已发货" name="shipped"></el-tab-pane>
                <el-tab-pane label="已签收" name="signed"></el-tab-pane>
            </el-tabs>
        </el-header>
        <el-main height="auto"><router-view /></el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            activeName:"toBeShipped"
        }
    },
    methods: {
        handleClick(tab, event){
            if (tab.name === 'toBeShipped') {
                this.$router.push('/index/orderForm/toBeShipped');
                sessionStorage.setItem('activeName-orderForm', 'toBeShipped');
            }
            else if (tab.name === 'shipped') {
                this.$router.push('/index/orderForm/shipped');
                sessionStorage.setItem('activeName-orderForm', 'shipped');
            }
            else if (tab.name === 'signed') {
                this.$router.push('/index/orderForm/Signed');
                sessionStorage.setItem('activeName-orderForm', 'Signed');
            }
        },
    },
    beforeMount(){
        if(sessionStorage.getItem('activeName-orderForm')!== null){
            this.activeName = sessionStorage.getItem('activeName-orderForm');
        }
    },
    destroyed(){
        sessionStorage.removeItem('activeName-orderForm');
    }

}
</script>

<style scoped></style>