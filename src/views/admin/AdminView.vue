<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-28 19:51:18
 * @FilePath: \vue\src\views\admin\AdminView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="250px" style="background-color: rgb(238, 241, 246);">
            <div style="display:flex;justify-content:center">
                <p style="font-size: xx-large;font-weight: bolder;">管理后台</p>
            </div>
            <el-menu @select="handleSelect" :default-active="defaultActive">
                <el-menu-item index="0">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">概况</span>
                </el-menu-item>

                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
                    <el-menu-item index="1-0">品牌管理</el-menu-item>
                    <el-menu-item index="1-1">类型管理</el-menu-item>
                    <el-menu-item index="1-2">出售商品详情管理</el-menu-item>
                    <el-menu-item index="1-3">租赁商品详情管理</el-menu-item>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-tickets"></i>出售订单管理</template>
                    <el-menu-item index="2-0">待发货订单</el-menu-item>
                    <el-menu-item index="2-1">已发货订单</el-menu-item>
                    <el-menu-item index="2-2">用户已签收订单</el-menu-item>
                </el-submenu>

                <el-submenu index="5">
                    <template slot="title"><i class="el-icon-tickets"></i>租赁订单管理</template>
                    <el-menu-item index="5-0">待发货订单</el-menu-item>
                    <el-menu-item index="5-1">已发货订单</el-menu-item>
                    <el-menu-item index="5-2">用户已签收订单</el-menu-item>
                    <el-menu-item index="5-3">用户退回订单</el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-tickets"></i>收购订单管理</template>
                    <el-menu-item index="3-0">待签收订单</el-menu-item>
                    <el-menu-item index="3-1">待退货订单</el-menu-item>
                    <el-menu-item index="3-2">待上架订单</el-menu-item>
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
            defaultActive: 0,
        }
    },
    beforeMount() {
        this.defaultActive = sessionStorage.getItem('defaultActive')
        this.aid = sessionStorage.getItem('aid')
        this.$request.get('user/getUserInfo?id=' + sessionStorage.getItem('aid') + '&password=' + sessionStorage.getItem('pwd')).then(res => {
            if (res.code == 200) {
                this.user = res.data
            }
        })
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            //概况
            if (keyPath[0] == 0) {
                this.$router.push('/admin/generalSituation')
                sessionStorage.setItem('defaultActive', 0)
            }
            //商品管理
            else if (keyPath[0] == 1) {
                if (keyPath[1] == '1-0') {
                    this.$router.push('/admin/brandManagement')
                    sessionStorage.setItem('defaultActive', '1-0')
                }
                else if (keyPath[1] == '1-1') {
                    this.$router.push('/admin/typeManagement')
                    sessionStorage.setItem('defaultActive', '1-1')
                }
                else if (keyPath[1] == '1-2') {
                    this.$router.push('/admin/goodsManagement')
                    sessionStorage.setItem('defaultActive', '1-2')
                }
                else if (keyPath[1] == '1-3') {
                    this.$router.push('/admin/rentalGoodsManagement')
                    sessionStorage.setItem('defaultActive', '1-3')
                }
            }
            else if (keyPath[0] == 2) {
                if (keyPath[1] == '2-0') {
                    this.$router.push('/admin/toBeShippedManagement')
                    sessionStorage.setItem('defaultActive', '2-0')
                }
                else if (keyPath[1] == '2-1') {
                    this.$router.push('/admin/shippedManagement')
                    sessionStorage.setItem('defaultActive', '2-1')
                }

                else if (keyPath[1] == '2-2') {
                    this.$router.push('/admin/signedManagement')
                    sessionStorage.setItem('defaultActive', '2-2')
                }

            }
            else if (keyPath[0] == 3) {
                if (keyPath[1] == '3-0') {
                    this.$router.push('/admin/purchaseToBeSignedManagement')
                    sessionStorage.setItem('defaultActive', '3-0')
                }

                else if (keyPath[1] == '3-1') {
                    this.$router.push('/admin/purchaseToBeReturnedManagement')
                    sessionStorage.setItem('defaultActive', '3-1')
                }

                else if (keyPath[1] == '3-2') {
                    this.$router.push('/admin/pendingOrderFormManagement')
                    sessionStorage.setItem('defaultActive', '3-2')
                }

            }
            else if (keyPath[0] == 4) {
                if (keyPath[1] == '4-0') {
                    this.$router.push('/admin/regularUserManagement')
                    sessionStorage.setItem('defaultActive', '4-0')
                }

                else if (keyPath[1] == '4-1') {
                    this.$router.push('/admin/salepersonManagement')
                    sessionStorage.setItem('defaultActive', '4-1')
                }

                else if (keyPath[1] == '4-2') {
                    this.$router.push('/admin/appraiserManagement')
                    sessionStorage.setItem('defaultActive', '4-2')
                }

                else if (keyPath[1] == '4-3') {
                    this.$router.push('/admin/adminManagement')
                    sessionStorage.setItem('defaultActive', '4-3')
                }

            }
            else if (keyPath[0] == 5) {
                if (keyPath[1] == '5-0') {
                    this.$router.push('/admin/rentalOrderFormToBeShippedManagement')
                    sessionStorage.setItem('defaultActive', '5-0')
                }

                else if (keyPath[1] == '5-1') {
                    this.$router.push('/admin/rentalOrderFormSignedManagement')
                    sessionStorage.setItem('defaultActive', '5-1')
                }

                else if (keyPath[1] == '5-2') {
                    this.$router.push('/admin/rentalOrderFormShippedManagement')
                    sessionStorage.setItem('defaultActive', '5-2')
                }
                else if (keyPath[1] == '5-3') {
                    this.$router.push('/admin/rentalOrderFormReturnManagement')
                    sessionStorage.setItem('defaultActive', '5-3')
                }
            }
        },
        handleCommand(command) {
            //this.$message('click on item ' + command);
            if (command == 'logout') {
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