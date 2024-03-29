<template>
  <div>
    <div>
      <p style="font-size: x-large; font-weight: bolder">收购商品详情管理</p>
    </div>
    <div>
      <el-button
        type="primary"
        style=""
        icon="el-icon-plus"
        @click="goToAddGoods"
        >添加</el-button
      >
    </div>
    <div style="display: flex; margin-top: 15px; justify-content: center">
      <div style="width: 100%">
        <el-table :data="goodsVoList" style="width: 100%" border>
          <el-table-column label="id" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品" width="125">
            <template slot-scope="scope"
              ><el-image
                style="width: 100px; height: 100px"
                :src="scope.row.img"
                fit="cover"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image></template
            >
          </el-table-column>

          <el-table-column label="详情" width="300">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.info }}</span>
            </template>
          </el-table-column>

          <el-table-column label="成色" width="60">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fineness }}</span>
            </template>
          </el-table-column>

          <el-table-column label="品牌" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.brandName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="价格" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column label="添加时间" width="250">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" style="margin-left: 10px;color: blue;">在售</span>
              <span v-if="scope.row.state==0" style="margin-left: 10px;color: red;">已售</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                style="margin-right: 5px"
                >编辑</el-button
              >
              <el-dialog title="修改" :visible.sync="dialogEditFormVisible">
                <el-input
                  v-model="brandName"
                  placeholder="请输入品牌名"
                ></el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogEditFormVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="editBrand">确 定</el-button>
                </div>
              </el-dialog>

              <el-popconfirm
                title="确定删除吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <el-button size="mini" type="danger" slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
</template>
  
<script>
export default {
  data() {
    return {
      goodsVoList: [],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      newBrandName: "",
      newBrandId: "",
      brandName: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      sessionStorage.setItem('gid',row.id)
      this.$router.push({
          path: "updateGoods",
          query: {
            type: "出售",
          },
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$request
        .post("goods/deleteGoodsById", {
          id: row.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.$router.go(0);
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        });
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.$request
        .get(
          "goods/getGoodsPageByState?state=&page=" +
            this.currentPage +
            "&rows=" +
            this.pageSize
        )
        .then((res) => {
          this.total = res.data.total;
          this.goodsVoList = res.data.goodsVoList;
        });
    },
    addBrand() {
      this.dialogFormVisible = false;
      //console.log(this.newBrandName);
      this.$request
        .post("goodsBrand/addBrand", {
          id: this.newBrandId,
          name: this.newBrandName,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.$router.go(0);
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        });
    },
    editBrand() {
      this.$request
        .post("goodsBrand/updateBrand", {
          id: sessionStorage.getItem("bid"),
          name: this.brandName,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            sessionStorage.removeItem("bid");
            this.$router.go(0);
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        });
    },
    goToAddGoods() {
      this.$router.push({
          path: "addGoods",
          query: {
            type: "出售",
          },
        });
    },
  },
  beforeMount() {
    this.currentPage = 1;
    this.$request
      .get(
        "goods/getGoodsPageByState?state=&page=" +
          this.currentPage +
          "&rows=" +
          this.pageSize
      )
      .then((res) => {
        this.total = res.data.total;
        this.goodsVoList = res.data.goodsVoList;
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