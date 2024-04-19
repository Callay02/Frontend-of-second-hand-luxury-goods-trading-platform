<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-19 09:59:41
 * @FilePath: \vue\src\views\admin\AdminView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="250px" style="background-color: rgb(238, 241, 246);">
            <div style="display:flex;justify-content:center">
                <p style="font-size: xx-large;font-weight: bolder;">鉴定师后台</p>
            </div>
            <el-menu @select="handleSelect" default-active="0">
                <el-menu-item index="0">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">概况</span>
                </el-menu-item>

                <el-menu-item index="1">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">待鉴定订单</span>
                </el-menu-item>

                <el-menu-item index="2">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">已鉴定订单</span>
                </el-menu-item>
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
        this.apid = sessionStorage.getItem('apid')
        this.$request.get('user/getUserInfo').then(res => {
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
                this.$router.push('/appraiser/generalSituation')
            //待鉴定
            else if(keyPath[0]==1){
                this.$router.push('/appraiser/toBeAppraised')
            }
            //已鉴定
            else if(keyPath[0]==2){
                this.$router.push('/appraiser/appraised')
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