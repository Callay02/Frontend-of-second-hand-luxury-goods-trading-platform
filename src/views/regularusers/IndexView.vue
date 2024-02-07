<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-13 19:07:07
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-07 21:24:14
 * @FilePath: \vue\src\views\regularusers\IndexView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="bg">
        <el-container>
            <el-header><el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="home">首页</el-menu-item>
                    <el-submenu index="goodsType">
                        <template slot="title">商品分类</template>
                        <el-menu-item v-for="item in goodsType" :index="item.type + ''" :key="item.type">{{ item.name
                        }}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="my" style="float: right;">
                        <template slot="title"><el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar></template>
                        <el-menu-item index="myInfo" >账号详情</el-menu-item>
                        <el-menu-item index="logout" style="color: red;">退出登录</el-menu-item>
                    </el-submenu>
                    <el-menu-item style="float: right;" index="3">我的订单</el-menu-item>
                    <el-menu-item style="float: right;" index="shoppingCart">购物车</el-menu-item>
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
            activeIndex: "home",
            goodsType: []
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            //console.log(key, keyPath);
            //console.log(keyPath)
            if (keyPath[0] == 'home') {
                this.$router.push('/index/home')
            }
            else if (keyPath[0] == 'goodsType') {
                this.$router.push({
                    path: "/index/goodsType",
                    query: {
                        type: key
                    }
                })
            }
            else if(keyPath[0]=='shoppingCart'){
                this.$router.push('/index/shoppingCart')
            }
            else if (keyPath[0] == 'my') {
                if(keyPath[1]=='myInfo'){
                    this.$router.push('/index/myInfo')
                }
                else{
                    this.$router.push('/logout')
                }
            }

        },
    },
    beforeMount() {
        //获取商品类型信息
        this.$request.get('/goodsType/getGoodsType').then(res => {
            //console.log(res)
            if (res.code == 200) {
                this.goodsType = res.data
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
.el-menu-item.is-active {
    color: black !important;
}
</style>