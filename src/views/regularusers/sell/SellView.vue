<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-09 00:34:30
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-08 09:56:22
 * @FilePath: \vue\src\views\regularusers\OrderFormView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-container>
        <el-header><el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                
                <el-menu-item index="0">订单跟踪</el-menu-item>
                <el-menu-item index="1">审核完成</el-menu-item>
                <el-menu-item index="2">交易成功</el-menu-item>
                <el-menu-item index="3" style="float: right;">创建订单</el-menu-item>
            </el-menu></el-header>
        <el-main><router-view /></el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: "0"
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
            if (keyPath[0] == 3) {
                this.$router.push('/index/sell/CreateSellOrder')
            }
            else if (keyPath[0] == 0) {
                this.$router.push('/index/sell/sellOrderTracking')
            }
            else if (keyPath[0] == 1) {
                this.$router.push('/index/sell/appraised')
            }
            else if (keyPath[0] == 2) {
                this.$router.push('/index/sell/reSuccess')
            }
        }
    }

}
</script>

<style scoped></style>