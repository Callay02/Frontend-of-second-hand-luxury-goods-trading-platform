<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-13 19:07:07
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-01-31 01:19:43
 * @FilePath: \vue\src\views\regularusers\IndexView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="bg">
        <el-container>
            <el-header><el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                    router>
                    <el-menu-item index="/index/home">首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">商品分类</template>
                        <el-menu-item index="2-1">时装</el-menu-item>
                        <el-menu-item index="2-2">珠宝</el-menu-item>
                        <el-menu-item index="2-3">腕表</el-menu-item>
                        <el-menu-item index="2-3">香水</el-menu-item>
                        <el-menu-item index="2-3">化妆品</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">购物车</el-menu-item>
                    <el-menu-item index="4">我的订单</el-menu-item>
                </el-menu></el-header>
            <el-main>
                <router-view />
            </el-main>
            <el-footer>
                <hr>
                Footer
            </el-footer>
        </el-container>

    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: "index/home"
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    beforeMount() {
        
        //获取商品类型信息
        this.$request.get('/goodsType/getGoodsType').then(res=>{
        console.log(res)
        if(res.code==200){
            this.goodsType=res.data
        }
    })

    }
}
</script>

<style lang="css" scoped>
.bg {
    width: 98vw;
    display: flex;
    justify-content: center
}
</style>