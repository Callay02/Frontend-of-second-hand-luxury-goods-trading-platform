<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-19 17:37:19
 * @FilePath: \vue\src\views\admin\AdminView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
      <div style="display: flex; justify-content: center">
        <p style="font-size: xx-large; font-weight: bolder">代理商后台</p>
      </div>
      <el-menu @select="handleSelect" :default-active="defaultIndex">
        <el-menu-item index="0">
          <i class="el-icon-pie-chart"></i>
          <span slot="title">概况</span>
        </el-menu-item>

        <el-menu-item index="1">
          <i class="el-icon-goods"></i>
          <span slot="title">商品搜索</span>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-user"></i>订单管理</template>
          <el-menu-item index="2-0">待发货</el-menu-item>
          <el-menu-item index="2-1">已发货</el-menu-item>
          <el-menu-item index="2-2">已签收</el-menu-item>
        </el-submenu>

        <el-menu-item index="3">
          <i class="el-icon-tickets"></i>
          <span slot="title">个人信息管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span style="margin-right: 5px">{{ user.name }}</span>
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout" style="color: red">退出登录</el-dropdown-item>
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
      defaultIndex: 0
    };
  },
  beforeMount() {
    this.sid = sessionStorage.getItem("sid");
    this.defaultIndex = sessionStorage.getItem('default-index')
    this.$request
      .get(
        "user/getUserInfo"
      )
      .then((res) => {
        if (res.code == 200) {
          this.user = res.data;
        }
      });
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //概况
      if (keyPath[0] == 0) {
        this.$router.push("/salesperson/salespersonGeneralSituation");
        sessionStorage.setItem('default-index', 0)
      }
      //商品搜索
      else if (keyPath[0] == 1) {
        this.$router.push("/salesperson/searchGoods");
        sessionStorage.setItem('default-index', 1)
      }
      //订单管理
      else if (keyPath[0] == 2) {
        //this.$router.push('/appraiser/appraised')
        if (keyPath[1] == '2-0') {
          this.$router.push("/salesperson/salespersonToBeShipped");
          sessionStorage.setItem('default-index', '2-0')
        }
        else if (keyPath[1] == '2-1') {
          this.$router.push("/salesperson/salespersonShipped");
          sessionStorage.setItem('default-index', '2-1')
        }
        else if (keyPath[1] == '2-2') {
          this.$router.push("/salesperson/salespersonSigned");
          sessionStorage.setItem('default-index', '2-2')
        }
      }
      //个人信息管理
      else if (keyPath[0] == 3) {
        this.$router.push("/salesperson/mySalespersonInfo");
        sessionStorage.setItem('default-index', 3)
      }
    },
    handleCommand(command) {
      //this.$message('click on item ' + command);
      if (command == "logout") {
        this.$router.push("/logout");
      }
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>