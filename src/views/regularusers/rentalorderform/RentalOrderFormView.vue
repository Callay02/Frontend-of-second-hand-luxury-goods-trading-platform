<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-03-27 15:29:14
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-20 05:01:57
 * @FilePath: \vue\src\views\regularusers\rentalorderform\RentalOrderFormView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="待发货" name="toBeShipped"></el-tab-pane>
                <el-tab-pane label="已发货" name="shipped"></el-tab-pane>
                <el-tab-pane label="已签收" name="signed"></el-tab-pane>
                <el-tab-pane label="退回中" name="return"></el-tab-pane>
                <el-tab-pane label="已结算" name="settled"></el-tab-pane>
            </el-tabs>
        </div>
        <div height="auto">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'toBeShipped'
        };
    },
    methods: {
        handleClick(tab, event) {
            if (tab.name === 'toBeShipped') {
                this.$router.push('/index/rentalOrderForm/toBeShipped');
                sessionStorage.setItem('activeName-rentalOrderForm', 'toBeShipped');
            }
            else if (tab.name === 'shipped') {
                this.$router.push('/index/rentalOrderForm/shipped');
                sessionStorage.setItem('activeName-rentalOrderForm', 'shipped');
            }
            else if (tab.name === 'signed') {
                this.$router.push('/index/rentalOrderForm/signed');
                sessionStorage.setItem('activeName-rentalOrderForm', 'signed');
            }
            else if (tab.name === 'return') {
                this.$router.push('/index/rentalOrderForm/return');
                sessionStorage.setItem('activeName-rentalOrderForm', 'return');
            }
            else if (tab.name === 'settled') {
                this.$router.push('/index/rentalOrderForm/settled');
                sessionStorage.setItem('activeName-rentalOrderForm', 'settled');
            }
        }
    },
    beforeMount() {
        if(sessionStorage.getItem('activeName-rentalOrderForm')!== null){
            this.activeName = sessionStorage.getItem('activeName-rentalOrderForm');
        }
    },
    destroyed(){
        sessionStorage.removeItem('activeName-rentalOrderForm');
    }
};
</script>

<style scoped></style>