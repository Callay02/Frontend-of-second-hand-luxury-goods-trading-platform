<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-09 00:34:30
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-20 04:59:06
 * @FilePath: \vue\src\views\regularusers\OrderFormView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-container>
        <el-header>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="订单跟踪" name="0"></el-tab-pane>
                <el-tab-pane label="审核完成" name="1"></el-tab-pane>
                <el-tab-pane label="交易成功" name="2"></el-tab-pane>
                <el-tab-pane label="创建订单" name="3" style="float: right;"></el-tab-pane>
            </el-tabs>
        </el-header>
        <el-main><router-view /></el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            activeName: "0"
        }
    },
    methods: {
        handleClick(tab, event){
            if (tab.name === '0') {
                this.$router.push('/index/sell/sellOrderTracking');
                sessionStorage.setItem('activeName-sell', '0');
            }
            else if (tab.name === '1') {
                this.$router.push('/index/sell/appraised');
                sessionStorage.setItem('activeName-sell', '1');
            }
            else if (tab.name === '2') {
                this.$router.push('/index/sell/reSuccess');
                sessionStorage.setItem('activeName-sell', '2');
            }
            else if (tab.name === '3') {
                this.$router.push('/index/sell/CreateSellOrder');
                sessionStorage.setItem('activeName-sell', '3');
            }
        },
    },
    beforeMount(){
        if(sessionStorage.getItem('activeName-sell')!== null){
            this.activeName = sessionStorage.getItem('activeName-sell');
        }
    },
    destroyed(){
        sessionStorage.removeItem('activeName-sell');
    }

}
</script>

<style scoped></style>