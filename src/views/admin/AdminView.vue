<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-25 20:58:46
 * @FilePath: \vue\src\views\admin\AdminView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="250px" style="background-color: rgb(238, 241, 246);">
            <div style="display:flex;justify-content:center">
                <p style="font-size: xx-large;font-weight: bolder;">管理后台</p>
            </div>
            <el-menu @select="handleSelect" default-active="0">
                <el-menu-item index="0">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">概况</span>
                </el-menu-item>

                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
                        <el-menu-item index="1-0">品牌管理</el-menu-item>
                        <el-menu-item index="1-1">类型管理</el-menu-item>
                        <el-menu-item index="1-2">商品详情管理</el-menu-item>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-tickets"></i>出售订单管理</template>
                        <el-menu-item index="2-0">待发货订单</el-menu-item>
                        <el-menu-item index="2-1">已发货订单</el-menu-item>
                        <el-menu-item index="2-2">已签收订单</el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-tickets"></i>出售订单管理</template>
                        <el-menu-item index="2-0">待发货订单</el-menu-item>
                        <el-menu-item index="2-1">已发货订单</el-menu-item>
                        <el-menu-item index="2-2">已签收订单</el-menu-item>
                </el-submenu>

                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-user"></i>用户管理</template>
                        <el-menu-item index="4-0">普通用户</el-menu-item>
                        <el-menu-item index="4-1">销售员</el-menu-item>
                        <el-menu-item index="4-2">鉴定师</el-menu-item>
                        <el-menu-item index="4-3">管理员</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <span style="margin-right: 5px;">{{ user.name }}</span>
                <el-dropdown @command="handleCommand">
                    <i class="el-icon-setting"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout" style="color: red;">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            user: {},
        }
    },
    beforeMount() {
        this.aid = sessionStorage.getItem('aid')
        this.$request.get('user/getUserInfo?id=' + sessionStorage.getItem('aid') + '&password=' + sessionStorage.getItem('pwd')).then(res => {
            if (res.code == 200) {
                this.user = res.data
            }
        })
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            //概况
            if(keyPath[0]==0)
                this.$router.push('/admin/generalSituation')
            //商品管理
            else if(keyPath[0]==1){
                if(keyPath[1]=='1-0')
                    this.$router.push('/admin/brandManagement')
                else if(keyPath[1]=='1-1')
                    this.$router.push('/admin/typeManagement')
                else if(keyPath[1]=='1-2')
                    this.$router.push('/admin/goodsManagement')
            }
            else if(keyPath[0]==2){
                if(keyPath[1]=='2-0')
                    this.$router.push('/admin/toBeShippedManagement')
                else if(keyPath[1]=='2-1')
                    this.$router.push('/admin/shippedManagement')
                else if(keyPath[1]=='2-2')
                    this.$router.push('/admin/signedManagement')
            }
            else if(keyPath[0]==4){
                if(keyPath[1]=='4-0')
                    this.$router.push('/admin/regularUserManagement')
                else if(keyPath[1]=='4-1')
                    this.$router.push('/admin/shippedManagement')
                else if(keyPath[1]=='4-2')
                    this.$router.push('/admin/signedManagement')
            }
        },
        handleCommand(command) {
            //this.$message('click on item ' + command);
            if(command=='logout'){
                this.$router.push('/logout')
            }
      }
    }
}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>