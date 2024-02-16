<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="250px" style="background-color: rgb(238, 241, 246);">
            <div style="display:flex;justify-content:center">
                <h1>管理后台</h1>
            </div>
            <el-menu @select="handleSelect">
                <el-menu-item index="0">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">概况</span>
                </el-menu-item>

                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-watch"></i>商品管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="0">品牌管理</el-menu-item>
                        <el-menu-item index="1">类型管理</el-menu-item>
                        <el-menu-item index="2">商品详情管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
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
            user: {}
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
            if(keyPath[0]==0){
                console.log("hello")
                this.$router.push('/admin/generalSituation')
            }
            else if(keyPath[0]==1){
                if(keyPath[1]==0)
                    this.$router.push('/admin/brandManagement')
                else if(keyPath[1]==1)
                    this.$router.push('/admin/typeManagement')
                else if(keyPath[1]==2)
                    this.$router.push('/admin/goodsManagement')
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