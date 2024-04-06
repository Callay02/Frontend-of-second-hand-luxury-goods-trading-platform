<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-06 16:18:53
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div>
      <div>
        <p style="font-size: x-large; font-weight: bolder">待签收订单</p>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="logisticsNumber" label="物流号">
          </el-table-column>
          <el-table-column prop="uid" label="用户id">
                    </el-table-column>
          <el-table-column prop="info" label="商品详情">
          </el-table-column>
          <el-table-column prop="brandName" label="品牌">
          </el-table-column>
          <el-table-column prop="typeName" label="类型">
          </el-table-column>
          <el-table-column prop="updateTime" label="发出时间">
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="sign(scope.$index, scope.row)"
                style="margin-right: 5px"
                >签收</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      dialogFormVisible: false,
    };
  },
  beforeMount() {
    this.currentPage = 1;
    this.$request
      .get(
        "purchaseOrderForm/getPurchaseOrderFormPageByState?state=0&page=" +
          this.currentPage +
          "&rows=" +
          this.pageSize
      )
      .then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.purchaseOrderFormVoList;
      });
  },
  methods: {
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.$request
        .get(
          "purchaseOrderForm/getPurchaseOrderFormPageByState?state=0&page=" +
            this.currentPage +
            "&rows=" +
            this.pageSize
        )
        .then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.purchaseOrderFormVoList;
        });
    },
    sign(index,row){
        console.log(row)
        this.$request.get('purchaseOrderForm/updatePurchaseOrderFormSateById?id='+row.id).then(res=>{
            if(res.code==200){
                this.$message({
                    type:"success",
                    message:res.msg
                })
                this.$router.go(0)
            }else{
                this.$message({
                    type:"warning",
                    message:res.msg
                })
            }
        })
    }
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>