<template>
  <div>
    <div>
      <p style="font-size: x-large; font-weight: bolder">销售员</p>
    </div>
    <div>
      <el-button size="medium" type="primary" style="" icon="el-icon-plus" @click="goToAddUser">添加</el-button>
    </div>
    <div style="display: flex; margin-top: 15px; justify-content: center">
      <div style="width: 100%">
        <el-table :data="userVoList" style="width: 100%" :border="true">
          <el-table-column label="id">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="钱包">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.money }}</span>
            </template>
          </el-table-column>

          <el-table-column label="邮箱">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.email }}</span>
            </template>
          </el-table-column>

          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="身份证">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.idCard }}</span>
            </template>
          </el-table-column>

          <el-table-column label="真实姓名">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.realName }}</span>
            </template>
          </el-table-column>


          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="250px">
            <template slot-scope="scope">
              <el-button size="mini" @click="goToDetail(scope.row)" style="margin-right: 5px">结算</el-button>
              <el-button size="mini" @click="handleRecharge(scope.$index, scope.row)"
                style="margin-right: 5px">充值</el-button>
              <el-dialog title="充值" :visible.sync="dialogRechargeFormVisible" append-to-body>
                <div>
                  <p style="display: inline-block;">充值金额 </p>
                </div>
                <el-input v-model="money" placeholder="请输入金额"></el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogRechargeFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="recharge">确 定</el-button>
                </div>
              </el-dialog>

              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" style="margin-right: 5px"
                type="danger">删除</el-button>
              <el-dialog title="确认删除" :visible.sync="dialogDeleteFormVisible" append-to-body>
                <div>
                  <p style="color: red;display: inline-block;">删除后将无法恢复 </p>
                  <p style="display: inline-block;">(请输入id" {{ selectUser.id }} "来确认删除)</p>
                </div>
                <el-input v-model="checkUid" placeholder="请输入id"></el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogDeleteFormVisible = false">取 消</el-button>
                  <el-button type="danger" @click="deleteUser">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      userVoList: [],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      dialogDeleteFormVisible: false,
      dialogRechargeFormVisible: false,
      selectUser: "",
      checkUid: "",
      money: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      //console.log(index, row);
      sessionStorage.setItem('gid', row.id)
      this.$router.push('updateGoods')
    },
    handleDelete(index, row) {
      //console.log(index, row);
      this.selectUser = row
      this.dialogDeleteFormVisible = true

    },
    handleRecharge(index, row) {
      this.selectUser = row
      this.dialogRechargeFormVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.$request
        .get(
          "user/getUserPageByType?type=1&page=" +
          this.currentPage +
          "&rows=" +
          this.pageSize
        )
        .then((res) => {
          console.log(res)
          this.total = res.data.total;
          this.userVoList = res.data.userVoList;
        });
    },
    goToAddUser() {
      this.$router.push({
        path: 'addUser',
        query: {
          type: 1
        }
      });
    },
    deleteUser() {
      if (this.checkUid == this.selectUser.id) {
        console.log(this.selectUser)
        this.selectUser.updateTime="";
        this.selectUser.type = 1
        this.$request.post('user/deleteUserById', this.selectUser).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            })
            this.$router.go(0)
          }
          else {
            this.$message({
              type: "warning",
              message: res.msg
            })
          }
        })

      }
      else {
        this.$message({
          type: "warning",
          message: "删除失败"
        })
      }
      this.checkUid = ""
      this.dialogDeleteFormVisible = false
    },
    recharge() {
      if (this.money != "") {
        this.selectUser.money = this.money
        this.$request.post('regularUser/recharge', this.selectUser).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            })
            this.$router.go(0)
            this.money = ""
          }
          else {
            this.$message({
              type: "warning",
              message: res.msg
            })
          }
        })
      }
      else{
        this.$message({
          type:"warning",
          message:"充值金额不能为空"
        })
      }

    },
    goToDetail(user){
      this.$router.push({
        path:'salepersonDetails',
        query: {
          sid: user.id
        }
      })
    }
  },
  beforeMount() {
    this.currentPage = 1;
    this.$request
      .get(
        "user/getUserPageByType?type=1&page=" +
        this.currentPage +
        "&rows=" +
        this.pageSize
      )
      .then((res) => {
        console.log(res)
        this.total = res.data.total;
        this.userVoList = res.data.userVoList;
      });
  },
};
</script>
  
<style>
.block {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>